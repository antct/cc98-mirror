import ListS from '@/hotfix/List'
import { IUser } from '@cc98/api'
import React from 'react'
import UserListItem from './UserListItem'


interface Props {
  data: IUser[]
}

const UserList: React.FC<Props> = ({ data }) => (
  <ListS>
    {data.map(x => (
      <UserListItem key={x.id} data={x} />
    ))}
  </ListS>
)

export default UserList
