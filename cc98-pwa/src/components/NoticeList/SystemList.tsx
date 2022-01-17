import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { ISystem } from '@cc98/api'
import { List } from '@material-ui/core'
import React, { useEffect } from 'react'
import SystemListItem from './SystemListItem'


const ListS = muiStyled(List)({
  width: '100%',
  paddingTop: 0,
  paddingBottom: 0
})

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
  const { useNotification} = useModel(settingModel, ['useNotification'])

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
