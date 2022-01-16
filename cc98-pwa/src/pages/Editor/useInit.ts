import { getOriginalPost } from '@/services/editor'
import { getSinglePost } from '@/services/post'
import { getTopicInfo } from '@/services/topic'
import dayjs from 'dayjs'
import { useState, useEffect, useReducer, useRef, Reducer } from 'react'
import { Props } from './index'


interface Init {
  /**
   * MetaInfo Model 初始值
   */
  metaInfo: {
    title: string
    type: number
    tag1?: number
    tag2?: number
  }
  /**
   * Editor Model 初始值
   */
  editor: {
    initContent: string
    initContentType: 0 | 1
  }
  /**
   * MetaInfo 的 props 之一
   * 同时 boardId 有值意味着是 发布/修改主题
   */
  boardId: number | undefined
}

function useStateCallback<S>(initialState: S) {
  const [state, setState] = useReducer<Reducer<S, Partial<S>>>(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  )
  const cbRef = useRef<((state: S) => void) | null>(null)

  function setStateCallback(state: Partial<S>, cb: (state: S) => void) {
    cbRef.current = cb
    setState(state)
  }

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state)
      cbRef.current = null
    }
  }, [state])

  return [state, setStateCallback] as const
}


/**
 * 获取 editor 和 metaInfo 的初始值，返回 null 意味着 loading 中
 */
export default function useInit(props: Props): Init | null {
  const { boardId, topicId, postId, floor } = props
  const [ok, setOk] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, setState] = useStateCallback({
    initContent: '',
    initContentType: <0 | 1>0,
    metaInfo: {
      title: '',
      type: 0,
      tag1: <number | undefined>undefined,
      tag2: <number | undefined>undefined
    },
    boardId: <number | undefined>undefined
  })

  if (ok) {
    return {
      metaInfo: state.metaInfo,
      editor: {
        initContent: state.initContent,
        initContentType: state.initContentType
      },
      boardId: state.boardId,
    }
  }

  // 发帖
  if (!isLoading && boardId && !topicId && !postId) {
    setIsLoading(true)
    setState({
      boardId: parseInt(boardId, 10),
    }, () => {
      setOk(true)
    })
    return null
  }

  // 引用某楼层
  if (!isLoading && topicId && floor) {
    setIsLoading(true)
    getSinglePost(topicId, parseInt(floor, 10)).then(res =>
      res.fail().succeed(postInfo => {
        const { floor, userName, time, topicId, content } = postInfo
        const formatTime = dayjs(time).format('YYYY-MM-DD HH:mm')
        setState({
          initContent: `[quote][b]以下是引用${floor}楼：用户${userName}在${formatTime}的发言：[color=blue][url=/topic/${topicId}#${floor}]>>查看原帖<<[/url][/color][/b]\n${content}[/quote]\n`
        }, () => {
          setOk(true)
        })
      })
    )
    return null
  }

  // 回复帖子
  if (topicId) {
    setOk(true)
    return null
  }

  // 编辑自己的帖子
  if (!isLoading && postId) {
    setIsLoading(true)
    getOriginalPost(postId).then(res =>
      res.fail().succeed(postInfo => {
        if (postInfo.floor !== 1) {
          setState({
            initContent: postInfo.content,
            initContentType: postInfo.contentType
          }, () => {
            setOk(true)
          })
          return
        }
        // 编辑主题
        getTopicInfo(postInfo.topicId).then(res =>
          res.fail().succeed(topicInfo => {
            setState({
              initContent: postInfo.content,
              initContentType: postInfo.contentType,
              boardId: postInfo.boardId,
              metaInfo: {
                title: topicInfo.title,
                type: topicInfo.type,
                tag1: topicInfo.tag1,
                tag2: topicInfo.tag2,
              }
            }, () => {
              setOk(true)
            })
          })
        )
      })
    )
    return null
  }

  return null
}
