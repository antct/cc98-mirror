import InfiniteList from '@/components/InfiniteList'
import useInfList, { Service } from '@/hooks/useInfList'
import { IBoardEvent } from '@cc98/api'
import React from 'react'
import RecordItem from './BoardRecordItem'


interface Props {
  service: Service<IBoardEvent[]>
}

const RecordList: React.FC<Props> = ({ service }) => {
  const [events, state, callback] = useInfList(service)
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {events.map(info => (
        <RecordItem key={info.id} eventInfo={info} />
      ))}
    </InfiniteList>
  )
}

export default RecordList
