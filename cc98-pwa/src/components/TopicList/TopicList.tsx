import muiStyled from '@/muiStyled'
import { ITopic } from '@cc98/api'
import { List } from '@material-ui/core'
import React from 'react'
import TopicListItem, { Place } from './TopicListItem'


const ListS = muiStyled(List)({
  width: '100%',
  paddingTop: 0,
  paddingBottom: 0
})

interface IUrlMap {
  [key: number]: string
}

interface Props {
  topics: ITopic[]
  place: Place
  urlMap: IUrlMap
}

const TopicList: React.FC<Props> = ({ topics, place, urlMap }) => {
  return (
    <ListS>
      {topics.map(info => (
        <TopicListItem key={info.id} data={info} place={place} portraitUrl={urlMap[info.userId]} />
      ))}
    </ListS>
  )
}

export default TopicList
