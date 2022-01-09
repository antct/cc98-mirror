import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import { IMessageContent } from '@cc98/api'
import React, { useEffect } from 'react'
import DetailItem from './DetailItem'

interface Props {
  data: IMessageContent[]
  func: () => void
}

export default ({ data, func }: Props) => {

  const { FRESH_READ } = userModel
  const { useNotification} = useModel(settingModel, ['useNotification'])

  function callback() {
    func()
    if (useNotification && data && data.length) {
      FRESH_READ()
    }
  }

  useEffect(() => {
    callback()
  }, [data])

  return (
    <>
      {data.map(item => (
        <DetailItem key={item.id} message={item} />
      ))}
    </>
  )
}
