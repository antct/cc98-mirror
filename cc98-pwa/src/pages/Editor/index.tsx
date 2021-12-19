import React, { useRef } from 'react'
import styled from 'styled-components'

import MetaInfo, { MetaInfoModel } from './MetaInfo'
import Editor, { EditorModel } from './Editor'

import useInit from './useInit'

import { ITopicParams, IPostParams, postTopic, replyTopic, editorPost } from '@/services/editor'

import { goback } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import useFetcher from '@/hooks/useFetcher'
import { getBoardInfo } from '@/services/board'

const WrapperDiv = styled.div`
  margin: 8px 12px;
`

/********************************
 * boardId - 发布帖子
 * topicId - 回复帖子
 * topicId & floor - 引用帖子
 * postId  - 修改帖子
 ********************************/

export interface Props {
  /**
   * 版面 ID
   */
  boardId: string
  /**
   * 帖子 ID
   */
  topicId?: string
  /**
   * 引用楼层数
   */
  floor?: string
  /**
   * 楼层 ID
   */
  postId?: string
}

export default (props: Props) => {
  const init = useInit(props)

  const isModelInit = useRef(false)

  const editor = useRef<EditorModel | null>(null)
  const metaModel = useRef<MetaInfoModel | null>(null)

  const [boardInfo] = useFetcher(() => getBoardInfo(props.boardId))

  if (init === null || boardInfo === null) {
    // init 还在获取中
    return null
  }

  if (!isModelInit.current) {
    editor.current = new EditorModel(init.editor.initContent)
    metaModel.current = new MetaInfoModel(init.metaInfo)
    isModelInit.current = true
  }

  editor.current!.setState({ anonymousState: boardInfo.anonymousState })
  // 本身就是匿名版块的，发送默认匿名，但实际上没用
  if (boardInfo.anonymousState === 1) editor.current!.setState({ anonymousSend: true })
  // 可选匿名版块
  if (boardInfo.anonymousState === 2) {
    // 编辑下不显示
    if (props.postId) editor.current!.setState({ anonymousAction: 0 })
    // 匿名回复
    else if (props.topicId) editor.current!.setState({ anonymousAction: 1 })
    // 匿名发帖
    else editor.current!.setState({ anonymousAction: 2 })
  }


  const onSendCallback = chooseSendCallback(
    editor.current!,
    metaModel.current!,
    props,
    init.boardId !== undefined
  )

  return (
    <WrapperDiv>
      {(init.boardId && !props.topicId && !props.postId) && <MetaInfo model={metaModel.current!} boardId={init.boardId} />}
      <Editor editor={editor.current!} onSendCallback={onSendCallback} />
    </WrapperDiv>
  )
}

/**
 * 选择合适的回调
 */
function chooseSendCallback(
  editor: EditorModel,
  metaInfo: MetaInfoModel,
  props: Props,
  isEditorTopic: boolean
): () => void {
  const { boardId, topicId, postId } = props

  const failCallback = () => {
    editor.setState({ isSending: false })
  }

  const successCallback = () => {
    editor.clearAll()
    editor.setState({ isSending: false })
    // TODO: 刷新帖子
    goback()
  }

  /**
   * for test
   */
  // return () => {
  //   setTimeout(() => {
  //     stopLoading()
  //   }, 2000)
  // }

  // 发布帖子
  if (boardId && !topicId && !postId) {
    return () => {
      let topicParams: ITopicParams = {
        ...metaInfo.state,
        content: editor.fullContent,
        contentType: 0,
      }
      if (editor.state.anonymousState == 2 && editor.state.anonymousSend) topicParams.isAnonymous = true
      postTopic(boardId, topicParams).then(res =>
        res
          .fail((data) => {
            if (data.msg == 'wealth_not_enough_for_anonymous_topic') snackbar.error('发布失败，财富值不足')
            else snackbar.error('发布失败')
            failCallback()
          })
          .succeed(() => {
            snackbar.success('发布成功')
            successCallback()
          })
      )
    }
  }

  // 回复帖子
  if (topicId) {
    return () => {
      let postParams: IPostParams = {
        title: '',
        content: editor.fullContent,
        contentType: 0
      }
      // 可选匿名版块，匿名发帖
      if (editor.state.anonymousState == 2 && editor.state.anonymousSend) postParams.isAnonymous = true
      console.log(postParams)
      replyTopic(topicId, postParams).then(res =>
        res
          .fail((data) => {
            if (data.msg == 'wealth_not_enough_for_anonymous_post') snackbar.error('财富值不足')
            else snackbar.error('回复失败')
            failCallback()
          })
          .succeed(() => {
            snackbar.success('回复成功')
            successCallback()
          })
      )
    }
  }

  // 编辑帖子
  if (postId) {
    return () => {
      const params: ITopicParams | IPostParams = isEditorTopic
        ? {
            ...metaInfo.state,
            content: editor.fullContent,
            contentType: 0,
          }
        : {
            title: '',
            content: editor.fullContent,
            contentType: 0,
          }
      editorPost(postId, params).then(res =>
        res
          .fail(() => {
            snackbar.error('编辑失败')
            failCallback()
          })
          .succeed(() => {
            snackbar.success('编辑成功')
            successCallback()
          })
      )
    }
  }

  // default callback
  return () => undefined
}
