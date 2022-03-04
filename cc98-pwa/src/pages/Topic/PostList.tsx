import InfiniteList from '@/components/InfiniteList'
import LoadingCircle from '@/components/LoadingCircle'
import { IS_PC } from '@/config'
import useFetcher, { Service as SService } from '@/hooks/useFetcher'
import useInfList, { Service, usePageList } from '@/hooks/useInfList'
import { getUsersInfoByIds } from '@/services/user'
import { GET } from '@/utils/fetch'
import { navigate } from '@/utils/history'
import { IPost, ISummary, ITopic, IUser } from '@cc98/api'
import { Divider } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import withStyles from '@mui/styles/withStyles'
import React, { useEffect, useRef, useState } from 'react'
import PostItem from './PostItem'
import PostListHot from './PostListHot'
import styled from 'styled-components'


interface IUserMap {
  [key: number]: IUser
}

interface Props {
  service: Service<IPost[]>
  hotService: SService<IPost[]>
  summaryService: SService<ISummary>
  topicInfo: ITopic
  isTrace: boolean
  isShare: boolean
  isCache: boolean
}

type voteItem = {
  id: number
  description: string
  count: number
}

type voteRecord = {
  userId: number
  userName: string
  items: number[]
  ip: string
  time: string
}

export type IVote = {
  topicId: number
  voteItems: voteItem[]
  voteRecords: voteRecord[]
  expiredTime: string
  isAvailable: boolean
  maxVoteCount: number
  canVote: boolean
  myRecord: voteRecord
  needVote: boolean
  voteUserCount: number
}

export function useUserMap() {
  const [userMap, setUserMap] = useState<IUserMap>({})

  const updateUserMap = async (list: IPost[]) => {
    if (list.length == 0) return null
    let userIds = list.map(p => p.userId).filter(id => id)
    if (userIds.length == 0) return null
    const res = await getUsersInfoByIds(userIds)
    res.fail().succeed(users => {
      users.forEach(user => {
        userMap[user.id] = user
      })

      // react use Object.is algorithm for comparing
      setUserMap({ ...userMap })
    })
  }

  return [userMap, updateUserMap] as [typeof userMap, typeof updateUserMap]
}

const PostList = ({ service, hotService, summaryService, isTrace, isShare, isCache, topicInfo }: Props) => {
  const [userMap, updateUserMap] = useUserMap()
  const [currentVote, setCurrentVote] = useState<IVote | undefined>(undefined)
  const [posts, state, callback] = useInfList(service, {
    step: 10,
    success: updateUserMap,
  })
  const { isLoading, isEnd } = state

  const getVote = (id: number) => {
    return GET<IVote>(`topic/${id}/vote`)
  }

  const setVote = async () => {
    const res = await getVote(topicInfo.id)
    res.fail().succeed(vote => {
      setCurrentVote(vote)
    })
  }

  useEffect(() => {
    if (topicInfo.isVote) setVote()
  }, [topicInfo])

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {posts.map(info =>
        info.floor === 1 ? (
          <>
            <PostItem
              postInfo={info}
              userInfo={userMap[info.userId]}
              topicInfo={topicInfo}
              voteInfo={currentVote}
              setVote={setVote}
              summaryService={isCache ? undefined : summaryService}
              isTrace={isTrace}
              isShare={isCache || isShare}
            />
            {!isTrace && !isCache &&
              <PostListHot
                service={hotService}
                isShare={isShare}
              />}
          </>
        ) : (
          <PostItem
            key={info.id}
            postInfo={info}
            userInfo={userMap[info.userId]}
            isTrace={isTrace}
            isShare={isCache || isShare}
          />
        )
      )}
    </InfiniteList>
  )
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 32px;
`

const PaginationS = withStyles(theme => ({
  ul: {
    justifyContent: 'center',
    flexWrap: 'inherit'
  }
}))(Pagination)


interface PageProps {
  service: Service<IPost[]>
  hotService: SService<IPost[]>
  summaryService: SService<ISummary>
  topicInfo: ITopic
  page: number
  isShare: boolean
  isCache: boolean
}

const PostPage = ({ service, hotService, summaryService, topicInfo, page, isShare, isCache }: PageProps) => {
  // url#floor，需要跳转到floor这个楼层
  const floorRef = useRef<HTMLDivElement>(null)
  let floorId = -1
  if (window.location.hash && window.location.hash !== "#") {
    const hash = window.location.hash;
    const eleId = hash.split("#");
    floorId = parseInt(eleId[1]) - 1;
  }

  // 获取当前页面帖子内容
  const totalPage = Math.ceil((topicInfo.replyCount + 1) / 10)
  const [userMap, updateUserMap] = useUserMap()
  const [currentVote, setCurrentVote] = useState<IVote | undefined>(undefined)
  const [posts, state, callback] = usePageList(service, {
    initFrom: page <= totalPage ? (page - 1) * 10 : (totalPage - 1) * 10,
    step: 10,
    success: updateUserMap,
  })
  const { isLoading, isEnd } = state

  // 如果是第一页，还需要获取热门帖子
  const [hotUserMap, updateHotUserMap] = useUserMap()
  const [hotPosts] = (page === 1) ? useFetcher(hotService, {
    success: updateHotUserMap,
  }) : []

  const setVote = async () => {
    const res = await GET<IVote>(`topic/${topicInfo.id}/vote`)
    res.fail().succeed(vote => {
      setCurrentVote(vote)
    })
  }

  useEffect(() => {
    (page === 1) && topicInfo.isVote && setVote()
  }, [topicInfo])


  // FIXME: 似乎应该加上指定依赖
  useEffect(() => {
    floorRef.current && floorRef.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    })
  }, [{}])

  return (
    isLoading ? <LoadingCircle />
      :
      <>
        <PaginationS
          count={totalPage}
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => { navigate(`/topic/${topicInfo.id}/${value}` + window.location.search) }}
        />
        <Divider />
        {posts.map((info: IPost, index: number) =>
          info.floor === 1 ?
            <>
              <PostItem
                postInfo={info}
                userInfo={userMap[info.userId]}
                topicInfo={topicInfo}
                voteInfo={currentVote}
                setVote={setVote}
                summaryService={isCache ? undefined : summaryService}
                isShare={isCache || isShare}
              />
              {
                hotPosts && hotPosts.map(info =>
                  <PostItem
                    key={info.id}
                    postInfo={info}
                    userInfo={hotUserMap[info.userId]}
                    isHot
                    isShare={isShare}
                  />
                )
              }
            </>
            :
            <PostItem
              key={info.id}
              ref={index === floorId ? floorRef : undefined}
              postInfo={info}
              userInfo={userMap[info.userId]}
              isShare={isCache || isShare}
            />
        )}
        <PaginationS
          count={totalPage}
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => { navigate(`/topic/${topicInfo.id}/${value}` + window.location.search) }}
        />
        <Divider />
      </>
  )
}

export default PostList
export { PostPage }
