import LoadingCircle from '@/components/LoadingCircle'
import useFetcher from '@/hooks/useFetcher'
import { getBoardInfo } from '@/services/board'
import { editorPost, IPostParams, ITopicParams, postTopic, replyTopic } from '@/services/editor'
import { goback } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import React, { useRef } from 'react'
import styled from 'styled-components'
import Editor, { EditorModel } from './Editor'
import MetaInfo, { MetaInfoModel } from './MetaInfo'
import useInit from './useInit'


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
    return <LoadingCircle />
  }

  if (!isModelInit.current) {
    editor.current = new EditorModel(init.editor.initContent, init.editor.initContentType)
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
    props
  )

  return (
    <WrapperDiv>
      {init.boardId && <MetaInfo model={metaModel.current!} boardId={init.boardId} />}
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
      const isVote = !!metaInfo.state.isVote
      const voteInfo = metaInfo.state.voteInfo
      if (isVote && voteInfo !== undefined && voteInfo.expiredDays < 1) {
        snackbar.error('请选择过期时间')
        failCallback()
        return
      }
      if (isVote && voteInfo !== undefined && voteInfo.maxVoteCount < 1) {
        snackbar.error('请选择最大投票数')
        failCallback()
        return
      }
      if (isVote && voteInfo !== undefined && voteInfo.voteItems.length <= 1) {
        snackbar.error('投票至少应有2个选项')
        failCallback()
        return
      }
      let topicParams: ITopicParams = {
        title: metaInfo.state.title,
        type: metaInfo.state.type,
        tag1: metaInfo.state.tag1,
        tag2: metaInfo.state.tag2,
        isVote: metaInfo.state.isVote,
        voteInfo: metaInfo.state.voteInfo,
        content: editor.fullContent,
        contentType: editor.state.contentType,
      }
      if (!isVote) {
        topicParams.isVote = undefined
        topicParams.voteInfo = undefined
      }
      if (editor.state.anonymousState == 2 && editor.state.anonymousSend) {
        if (isVote) {
          snackbar.error('投票禁止匿名')
          failCallback()
          return
        }
        topicParams.isAnonymous = true
      }
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
        contentType: editor.state.contentType
      }
      // 可选匿名版块，匿名发帖
      if (editor.state.anonymousState == 2 && editor.state.anonymousSend) postParams.isAnonymous = true
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
      const params: ITopicParams | IPostParams = (metaInfo.state.mode === 'edit_topic')
        ? {
          title: metaInfo.state.title,
          type: metaInfo.state.type,
          tag1: metaInfo.state.tag1,
          tag2: metaInfo.state.tag2,
          content: editor.fullContent,
          contentType: editor.state.contentType,
        }
        : {
          title: '',
          content: editor.fullContent,
          contentType: editor.state.contentType,
        }
      editorPost(postId, params).then(res =>
        res
          .fail((data) => {
            if (data.msg === 'topic_is_locked') snackbar.error('编辑失败，主题已锁沉')
            else if (data.msg === 'content_is_empty') snackbar.error('编辑失败，内容为空')
            else snackbar.error('编辑失败')
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
