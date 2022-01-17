import muiStyled from '@/muiStyled'
import { getUsersInfoByIds } from '@/services/user'
import { IUser } from '@cc98/api'
import { List } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import UserListItem, { Place } from './UserListItem'


const ListS = muiStyled(List)({
  width: '100%',
  paddingTop: 0,
  paddingBottom: 0
})

interface Props {
  data: number[]
  place: Place
  func: () => void
}

export default ({ data, place, func }: Props) => {
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
        <UserListItem key={x.id} data={x} place={place} />
      ))}
    </ListS>
  )
}
