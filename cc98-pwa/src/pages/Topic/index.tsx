import LoadingCircle from '@/components/LoadingCircle'
import useFetcher from '@/hooks/useFetcher'
import { getHotPost, getPost, getPostSummary, getReversePost, getTracePost } from '@/services/post'
import {
  getTopicInfo
} from '@/services/topic'
import { navigateHandler } from '@/services/utils/errorHandler'
import React, { useState } from 'react'
import styled from 'styled-components'
import FixButtons from './FixButtons'
import PostHead from './PostHead'
import PostList, { PostPage } from './PostList'
import PostListHot from './PostListHot'
import { navigate } from '@/utils/history'
import { useQuery } from '@/router'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'


const EndPlaceholder = styled.div`
  height: 64px;
`

interface Props {
  // 帖子 ID
  topicId: string
  page?: string
  // 追踪非匿名帖子
  userId?: string
  // 追踪匿名帖子
  postId?: string
  // 是否逆向
  isReverse?: boolean
  shareId?: string
}

const Topic = ({ topicId, page, userId, postId, isReverse, shareId }: Props) => {
  const { usePagination } = useModel(settingModel, ['usePagination'])

  if (topicId && !page && !userId && !postId && !isReverse && !shareId && usePagination) navigate(`/topic/${topicId}/1`, {replace: true})

  const safeATOB = (str: string) => {
    try {
      return window.atob(str)
    } catch (err) {
      return '++'
    }
  }
  if (!!shareId) {
    const [shareTopicId, sharePath, shareToken] = safeATOB(shareId).split('+')
    navigate(`${sharePath}?token=${shareToken}`)
  }
  const query = useQuery()
  const shareToken = query.get('token')
  const isShare = shareToken !== null

  if (!topicId) return null

  const [topicInfo, setTopicInfo] = useFetcher(isShare ? () => getTopicInfo(topicId, shareToken) : () => getTopicInfo(topicId), {
    fail: navigateHandler,
  })
  // 用于刷新
  const [postListKey, setPostListKey] = useState(0)

  if (!topicInfo) return <LoadingCircle />

  // 根据 URL 参数选择获取 post 的 service
  const postService = isReverse
    ? (from: number) => getReversePost(topicId, from, topicInfo.replyCount)
    : postId
      ? (from: number) => getTracePost(topicId, postId, from)
      :
      (from: number) => isShare ? getPost(topicId, from, shareToken) : getPost(topicId, from)

  const hotPostService = () => isShare ? getHotPost(topicId, shareToken) : getHotPost(topicId)

  const postSummaryService = () => isShare ? getPostSummary(topicId, shareToken) : getPostSummary(topicId)

  // 是否处于追踪状态
  const isTrace = !!userId || !!postId

  const refreshFunc = () => {
    getTopicInfo(topicId, isShare ? shareToken : undefined).then(res =>
      res.fail(navigateHandler).succeed(newTopicInfo => {
        setTopicInfo(newTopicInfo)
        setPostListKey(prevKey => prevKey + 1)
      })
    )
  }

  return (
    <>
      <PostHead topicInfo={topicInfo} refreshFunc={refreshFunc} isShare={isShare} />
      {
        page ?
          <PostPage key={postListKey} topicInfo={topicInfo} service={postService} summaryService={postSummaryService} page={parseInt(page)}>
            <PostListHot service={hotPostService} isShare={isShare} />
          </PostPage>
          :
          <PostList key={postListKey} topicInfo={topicInfo} service={postService} summaryService={postSummaryService} isTrace={isTrace} isShare={isShare}  >
            {!isTrace && !page && <PostListHot service={hotPostService} isShare={isShare} />}
          </PostList>
      }
      <FixButtons topicInfo={topicInfo} isReverse={isReverse} isShare={isShare} refreshFunc={refreshFunc} />
      {/* {!page && <EndPlaceholder />} */}
    </>
  )
}

/**
 * 逆序 Topic
 */
const TopicReverse = (props: Props) => <Topic isReverse {...props} />

export { Topic as default, TopicReverse }
