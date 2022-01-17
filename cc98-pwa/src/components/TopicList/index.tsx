import img404 from '@/assets/error.png'
import InfiniteList from '@/components/InfiniteList'
import LoadingCircle from '@/components/LoadingCircle'
import { MAX_WIDTH } from '@/config'
import useDelay from '@/hooks/useDelay'
import useFetcher, { Service as FinService } from '@/hooks/useFetcher'
import useInfList, { Service as InfService } from '@/hooks/useInfList'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { getUsersBasicInfoByIds } from '@/services/user'
import { navigateHandler } from '@/services/utils/errorHandler'
import { ITopic } from '@cc98/api'
import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import TopicList from './TopicList'
import { Place } from './TopicListItem'


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
  const updateUrlMap = async (list: ITopic[]) => {
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
  service: InfService<ITopic[]>
  place: Place
}

const InfTopicList: React.FC<InfProps> = ({ service, place }) => {
  const [urlMap, updateUrlMap] = useUrlMap()
  const { useAvatar } = useModel(settingModel, ['useAvatar'])
  const [topics, state, callback] = useInfList(service, {
    fail: navigateHandler,
    success: (place !== 'usercenter' && useAvatar) ? updateUrlMap : undefined
  })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && topics.length === 0 && (place === 'usercenter' ? <UserCenterEmptyList /> : <EmptyList />)}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <TopicList topics={topics} place={place} urlMap={urlMap} />
      </InfiniteList>
    </>
  )
}

interface FinProps {
  service: FinService<ITopic[]>
  noLoading?: boolean
  place: Place
  delay?: number
}

const FinTopicList: React.FC<FinProps> = ({ service, noLoading, place, delay = 0 }) => {
  const [urlMap, updateUrlMap] = useUrlMap()
  const { useAvatar } = useModel(settingModel, ['useAvatar'])
  const [topics] = useFetcher(service, { 
    fail: navigateHandler,
    success: (place !== 'usercenter' && useAvatar) ? updateUrlMap : undefined
  })
  const isResolve = useDelay(delay)

  if (topics === null || !isResolve) {
    return noLoading ? null : <LoadingCircle />
  }

  return <TopicList topics={topics} place={place} urlMap={urlMap} />
}

export { InfTopicList, FinTopicList }
