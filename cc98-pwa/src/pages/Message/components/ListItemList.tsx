import React, { useState, useEffect } from 'react'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import stateModel from '@/models/state'
import settingModel from '@/models/setting'

import ListItem from './ListItem'
import { IMessageContent, IRecentMessage, IUser } from '@cc98/api'
import { getUsersInfoByIds } from '@/services/user'

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
    getUsersInfoByIds(ids).then(res => {
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
