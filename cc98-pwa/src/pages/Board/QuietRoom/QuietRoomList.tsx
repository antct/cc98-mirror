import InfiniteList from '@/components/InfiniteList'
import useInfList, { Service } from '@/hooks/useInfList'
import { IBoardStopPostUser } from '@cc98/api'
import React from 'react'
import QuietRoomItem from './QuietRoomItem'


interface Props {
  service: Service<IBoardStopPostUser[]>
  boardId: number
  refreshFunc: () => void
  canManage: boolean
}

const QuietRoomList: React.FC<Props> = ({ service, boardId, refreshFunc, canManage }) => {
  const [users, state, callback] = useInfList(service)
  const { isLoading, isEnd } = state

  return (
    <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
      {users.map(info => (
        <QuietRoomItem
          key={info.userId}
          info={info}
          boardId={boardId}
          refreshFunc={refreshFunc}
          canManage={canManage}
        />
      ))}
    </InfiniteList>
  )
}
export default QuietRoomList
