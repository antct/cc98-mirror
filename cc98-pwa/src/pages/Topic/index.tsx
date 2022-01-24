import LoadingCircle from '@/components/LoadingCircle'
import useFetcher from '@/hooks/useFetcher'
import {
  getFloor, getHotPost, getPost, getReversePost, getShareHotPost, getSharePost, getTracePost
} from '@/services/post'
import {
  getShareTopicInfo, getTopicInfo
} from '@/services/topic'
import { navigateHandler } from '@/services/utils/errorHandler'
import React, { useState } from 'react'
import styled from 'styled-components'
import FixButtons from './FixButtons'
import PostHead from './PostHead'
import PostList from './PostList'
import PostListHot from './PostListHot'


const EndPlaceholder = styled.div`
  height: 64px;
`

interface Props {
  // 帖子 ID
  topicId: string
  page?: string
  floor?: string
  // 追踪非匿名帖子
  userId?: string
  // 追踪匿名帖子
  postId?: string
  // 是否逆向
  isReverse?: boolean
  shareId?: string
}

const Topic = ({ topicId, page, floor, userId, postId, isReverse, shareId }: Props) => {
  const safeATOB = (str: string) => {
    try {
      return window.atob(str)
    } catch (err) {
      return '+'
    }
  }
  const realId = !!shareId ? safeATOB(shareId) : topicId
  const isShare = !!shareId
  const [topicInfo, setTopicInfo] = useFetcher(isShare ? () => getShareTopicInfo(realId) : () => getTopicInfo(realId), {
    fail: navigateHandler,
  })
  // 用于刷新
  const [postListKey, setPostListKey] = useState(0)

  if (!topicInfo) {
    return <LoadingCircle />
  }

  // 根据 URL 参数选择获取 post 的 service
  const postService = isReverse
    ? (from: number) => getReversePost(topicInfo.id, from, topicInfo.replyCount)
    : postId
      ? (from: number) => getTracePost(topicInfo.id, postId, from)
      : floor
        ? (from: number) => getFloor(topicInfo.id, page ? 10 * (parseInt(page) - 1) + parseInt(floor) : parseInt(floor))
        : (from: number) => isShare ? getSharePost(realId, from) : getPost(topicInfo.id, from)

  const hotPostService = () => isShare ? getShareHotPost(realId) : getHotPost(topicInfo.id)

  // 是否处于追踪状态
  const isTrace = !!userId || !!postId

  const refreshFunc = () => {
    getTopicInfo(realId).then(res =>
      res.fail(navigateHandler).succeed(newTopicInfo => {
        setTopicInfo(newTopicInfo)
        setPostListKey(prevKey => prevKey + 1)
      })
    )
  }

  return (
    <>
      <PostHead topicInfo={topicInfo} refreshFunc={refreshFunc} isShare={isShare} />
      <PostList key={postListKey} topicInfo={topicInfo} service={postService} isTrace={isTrace} isShare={isShare}>
        {!isTrace && !page && !floor && <PostListHot service={hotPostService} isShare={isShare} />}
      </PostList>
      <FixButtons topicInfo={topicInfo} isReverse={isReverse} isShare={isShare} refreshFunc={refreshFunc} />
      <EndPlaceholder />
    </>
  )
}

/**
 * 逆序 Topic
 */
const TopicReverse = (props: Props) => <Topic isReverse {...props} />

export { Topic as default, TopicReverse }
