import ListS from '@/hotfix/List'
import { ITopic } from '@cc98/api'
import React from 'react'
import TopicListItem, { Place } from './TopicListItem'

interface IUrlMap {
  [key: number]: string
}

interface IHash {
  [key: number]: boolean
}

interface Props {
  topics: ITopic[]
  place: Place
  urlMap: IUrlMap
}

const TopicList: React.FC<Props> = ({ topics, place, urlMap }) => {
  const hash: IHash = {}
  const uniqueTopics = topics.filter((item) => {
    if (!hash[item.id]) {
      hash[item.id] = true
      return true
    }
  })
  return (
    <ListS>
      {uniqueTopics.map(info => (
        <TopicListItem key={info.id} data={info} place={place} portraitUrl={urlMap[info.userId]} />
      ))}
    </ListS>
  )
}

export default TopicList
