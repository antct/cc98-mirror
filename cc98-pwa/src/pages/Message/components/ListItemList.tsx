import { getUsersBasicInfoByIds } from '@/services/user'
import { IRecentMessage, IUser } from '@cc98/api'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

interface Props {
  data: IRecentMessage[]
  func: () => void
}

export default ({ data, func }: Props) => {
  const [userList, setUserList] = useState<IUser[]>([])
  const size = 20

  function callback() {
    let offset = data.length % size === 0 ? 20 : data.length % size
    let fromPos = data.length - offset
    if (fromPos < 0) {
      return null
    }
    let nextData = data.slice(fromPos)
    let ids = nextData.map(x => x.userId)
    getUsersBasicInfoByIds(ids).then(res => {
      res
        .fail(err => { })
        .succeed(list => {
          let fixList = nextData.map(x => list.filter(y => y.id === x.userId)[0])
          setUserList(prevList => prevList.concat(fixList))
          func()
        })
    })
  }

  useEffect(() => {
    callback()
  }, [data])

  return (
    <>
      {data.map((item, index) => (
        <ListItem key={data[index].userId} message={data[index]} user={userList[index]} />
      ))}
    </>
  )
}
