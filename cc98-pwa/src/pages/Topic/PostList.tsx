import InfiniteList from '@/components/InfiniteList'
import LoadingCircle from '@/components/LoadingCircle'
import { Service as SService } from '@/hooks/useFetcher'
import useInfList, { Service, usePageList } from '@/hooks/useInfList'
import { getUsersInfoByIds } from '@/services/user'
import { GET } from '@/utils/fetch'
import { navigate } from '@/utils/history'
import { IPost, ISummary, ITopic, IUser } from '@cc98/api'
import Pagination from '@mui/material/Pagination'
import withStyles from '@mui/styles/withStyles'
import React, { useEffect, useRef, useState } from 'react'
import PostItem from './PostItem'


interface IUserMap {
  [key: number]: IUser
}

interface Props {
  service: Service<IPost[]>
  summaryService: SService<ISummary>
  topicInfo: ITopic
  isTrace: boolean
  isShare: boolean
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

const PostList: React.FC<Props> = ({ service, summaryService, isTrace, children, isShare, topicInfo }) => {
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
          <React.Fragment key={info.id}>
            <PostItem
              postInfo={info}
              userInfo={userMap[info.userId]}
              topicInfo={topicInfo}
              voteInfo={currentVote}
              setVote={setVote}
              summaryService={summaryService}
              isTrace={isTrace}
              isShare={isShare}
            />
            {children}
          </React.Fragment>
        ) : (
          <PostItem
            key={info.id}
            postInfo={info}
            userInfo={userMap[info.userId]}
            isTrace={isTrace}
            isShare={isShare}
          />
        )
      )}
    </InfiniteList>
  )
}

const PaginationS = withStyles(theme => ({
  ul: {
    justifyContent: 'center',
    margin: '20px 0'
  }
}))(Pagination)

interface PageProps {
  service: Service<IPost[]>
  summaryService: SService<ISummary>
  topicInfo: ITopic
  page: number
  isShare: boolean
}

const PostPage: React.FC<PageProps> = ({ service, summaryService, topicInfo, page, isShare, children }) => {
  const floorRef = useRef<HTMLDivElement>(null)
  let floorId = -1
  if (window.location.hash && window.location.hash !== "#") {
    const hash = window.location.hash;
    const eleId = hash.split("#");
    floorId = parseInt(eleId[1]) - 1;
  }

  const [userMap, updateUserMap] = useUserMap()
  const [currentVote, setCurrentVote] = useState<IVote | undefined>(undefined)

  const totalPage = Math.ceil((topicInfo.replyCount + 1) / 10)
  const [posts, state, callback] = usePageList(service, {
    initFrom: page <= totalPage ? (page - 1) * 10 : (totalPage - 1) * 10,
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
    (page === 1) && topicInfo.isVote && setVote()
  }, [topicInfo])

  useEffect(() => {
    floorRef.current && floorRef.current.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    })
  }, [floorRef.current])

  return (
    isLoading ? <LoadingCircle />
      :
      <>
        {posts.map((info: IPost, index: number) =>
          info.floor === 1 ? (
            <React.Fragment key={info.id}>
              <PostItem
                postInfo={info}
                userInfo={userMap[info.userId]}
                topicInfo={topicInfo}
                voteInfo={currentVote}
                setVote={setVote}
                isShare={isShare}
                summaryService={summaryService}
              />
              {children}
            </React.Fragment>
          ) : (
            <PostItem
              key={info.id}
              ref={index === floorId ? floorRef : undefined}
              isShare={isShare}
              postInfo={info}
              userInfo={userMap[info.userId]}
            />
          )
        )}
        <PaginationS
          count={totalPage}
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => { navigate(`/topic/${topicInfo.id}/${value}` + window.location.search) }}
          showFirstButton
          showLastButton
        />
      </>
  )
}

export default PostList
export { PostPage }
