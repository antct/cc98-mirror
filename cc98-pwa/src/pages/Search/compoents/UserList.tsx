import React from 'react'
import muiStyled from '@/muiStyled'

import { List } from '@material-ui/core'

import UserListItem from './UserListItem'

import { IUser } from '@cc98/api'

const ListS = muiStyled(List)({
  width: '100%',
})

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
