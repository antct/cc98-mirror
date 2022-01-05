import React, { useEffect, useState } from 'react'
import muiStyled from '@/muiStyled'

import { List } from '@material-ui/core'

import TopicListItem, { Place } from './TopicListItem'

import { ITopic } from '@cc98/api'

const ListS = muiStyled(List)({
  width: '100%',
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
