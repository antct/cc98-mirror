import React, { useState, useEffect } from 'react'
import muiStyled from '@/muiStyled'

import { List } from '@material-ui/core'

import UserListItem from './UserListItem'

import { IUser } from '@cc98/api'
import { getUsersInfoByIds } from '@/services/user'

const ListS = muiStyled(List)({
  width: '100%',
})

interface Props {
  data: number[]
  func: () => void
}

export default ({ data, func }: Props) => {
  const [userList, setUserList] = useState<IUser[]>([])
  const size = 20

  function callback() {
    if (data.length === userList.length) {
      func()
      return null
    }
    let offset = data.length % size === 0 ? 20 : data.length % size
    let fromPos = data.length - offset
    if (fromPos < 0) {
      return null
    }
    let nextData = data.slice(fromPos)
    getUsersInfoByIds(nextData).then(res => {
      res
        .fail(err => { })
        .succeed(list => {
          let fixList = nextData.map(x => list.filter(y => y.id === x)[0])
          setUserList(prevList => prevList.concat(fixList))
          func()
        })
    })
  }

  useEffect(() => {
    callback()
  }, [data])

  return (
    <ListS>
      {userList.map(x => (
        <UserListItem key={x.id} data={x} />
      ))}
    </ListS>
  )
}
