import React, { useState, useEffect } from 'react'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import stateModel from '@/models/state'
import settingModel from '@/models/setting'

import DetailItem from './DetailItem'
import { IMessageContent } from '@cc98/api'

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
