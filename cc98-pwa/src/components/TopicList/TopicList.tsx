import React, { useEffect, useState } from 'react'
import muiStyled from '@/muiStyled'

import { List } from '@material-ui/core'

import TopicListItem, { Place } from './TopicListItem'

import { ITopic, IUser } from '@cc98/api'
import { getUsersBasicInfoByIds } from '@/services/user'

const ListS = muiStyled(List)({
  width: '100%',
})

interface Props {
  topics: ITopic[]
  place: Place
}

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


const TopicList: React.FC<Props> = ({ topics, place }) => {
  const [urlMap, updateUrlMap] = useUrlMap()
  useEffect(() => {
    updateUrlMap(topics)
  }, [topics])

  return (
    <ListS>
      {topics.map(info => (
        <TopicListItem key={info.id} data={info} place={place} portraitUrl={urlMap[info.userId]} />
      ))}
    </ListS>
  )
}

export default TopicList
