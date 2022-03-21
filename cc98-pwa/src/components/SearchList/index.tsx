import img404 from '@/assets/error.png'
import InfiniteList from '@/components/InfiniteList'
import { MAX_WIDTH } from '@/config'
import useInfList, { Service as InfService } from '@/hooks/useInfList'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { getUsersBasicInfoByIds } from '@/services/user'
import { navigateHandler } from '@/services/utils/errorHandler'
import { IPost } from '@cc98/api'
import React, { useState } from 'react'
import styled from 'styled-components'
import SearchList from './SearchList'
import { Place } from './SearchListItem'


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

/**
 * 空列表占位，表示 InfList 什么都没有
 */
const EmptyList = () => (
  <CenterDiv>
    <Img src={img404} />
  </CenterDiv>
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

const InfSearchList: React.FC<InfProps> = ({ service, place }) => {
  const [urlMap, updateUrlMap] = useUrlMap()
  const [posts, state, callback] = useInfList(service, {
    fail: navigateHandler,
    success: updateUrlMap
  })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && posts.length === 0 && <EmptyList />}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <SearchList posts={posts} place={place} urlMap={urlMap} />
      </InfiniteList>
    </>
  )
}
export { InfSearchList }
