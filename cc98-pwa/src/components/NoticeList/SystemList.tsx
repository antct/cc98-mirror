import useModel from '@/hooks/useModel'
import ListS from '@/hotfix/List'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import { ISystem } from '@cc98/api'
import React, { useEffect } from 'react'
import SystemListItem from './SystemListItem'


interface Props {
  data: ISystem[]
}

const SystemList: React.FC<Props> = ({ data }) => (
  <ListS>
    {data.map(x => (
      <SystemListItem key={x.id} data={x} />
    ))}
  </ListS>
)


export default ({ data }: Props) => {
  const { FRESH_READ } = userModel
  const { useNotification } = useModel(settingModel, ['useNotification'])

  function callback() {
    if (useNotification && data && data.length) {
      FRESH_READ()
    }
  }

  useEffect(() => {
    callback()
  }, [data])

  return (
    <SystemList
      data={data}
    />
  )
}

// export default SystemList
