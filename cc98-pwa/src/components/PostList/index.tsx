import img404 from '@/assets/error.png'
import InfiniteList from '@/components/InfiniteList'
import { MAX_WIDTH } from '@/config'
import useInfList, { Service as InfService } from '@/hooks/useInfList'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { getUsersBasicInfoByIds } from '@/services/user'
import { navigateHandler } from '@/services/utils/errorHandler'
import { IPost } from '@cc98/api'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import PostList from './PostList'
import { Place } from './PostListItem'


const Img = styled.img`
  width: 60%;
  max-width: ${MAX_WIDTH}px;
`
const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const UBBDiv = styled.div`
  width: 100%;
  margin: 0 20px;
`

/**
 * 空列表占位，表示 InfList 什么都没有
 */
const EmptyList = () => (
  <CenterDiv>
    <Img src={img404} />
  </CenterDiv>
)

const UserCenterEmptyList = () => (
  <UBBDiv>
    <Typography>这家伙很懒，什么都没留下。</Typography>
  </UBBDiv>
)


interface IUrlMap {
  [key: number]: string
}

export function useUrlMap() {
  const [urlMap, setUrlMap] = useState<IUrlMap>({})
  const updateUrlMap = async (list: IPost[]) => {
    if (list.length == 0) return null
    let userIds = list.map(p => p.userId).filter(id => id)
    if (userIds.length == 0) return null
    const res = await getUsersBasicInfoByIds(userIds)
    res.fail().succeed(users => {
      users.forEach(user => {
        urlMap[user.id] = user.portraitUrl
      })
      setUrlMap({ ...urlMap })
    })
  }
  return [urlMap, updateUrlMap] as [typeof urlMap, typeof updateUrlMap]
}

interface InfProps {
  service: InfService<IPost[]>
  place: Place
}

const InfPostList: React.FC<InfProps> = ({ service, place }) => {
  const [urlMap, updateUrlMap] = useUrlMap()
  const { useAvatar } = useModel(settingModel, ['useAvatar'])
  const [posts, state, callback] = useInfList(service, {
    fail: navigateHandler,
    success: useAvatar ? updateUrlMap : undefined
  })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && posts.length === 0 && <EmptyList />}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <PostList posts={posts} place={place} urlMap={urlMap} />
      </InfiniteList>
    </>
  )
}
export { InfPostList }
