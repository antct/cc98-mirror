import React, { useState, useEffect } from 'react'

import useInfList, { Service } from '@/hooks/useInfList'

import InfiniteList from '@/components/InfiniteList'
import PostItem from './PostItem'

import { IPost, IUser, ITopic } from '@cc98/api'
import { getUsersInfoByIds } from '@/services/user'

import { GET } from '@/utils/fetch'

interface IUserMap {
  [key: number]: IUser
}

interface Props {
  service: Service<IPost[]>
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

const PostList: React.FC<Props> = ({ service, isTrace, children, isShare, topicInfo }) => {
  const [userMap, updateUserMap] = useUserMap()
  const [currentVote, setCurrentVote] = useState<IVote>()
  const [posts, state, callback] = useInfList(service, {
    step: 10,
    success: updateUserMap,
  })
  const { isLoading, isEnd } = state

  function getVote(id: number) {
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
            <PostItem isTrace={isTrace} postInfo={info} userInfo={userMap[info.userId]} isShare={isShare} topicInfo={topicInfo} voteInfo={topicInfo.isVote ? currentVote: undefined} />
            {children /** <PostListHot /> */}
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

export default PostList
