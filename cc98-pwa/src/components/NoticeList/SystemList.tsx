import React from 'react'
import muiStyled from '@/muiStyled'

import { List } from '@material-ui/core'

import SystemListItem from './SystemListItem'

import { ISystem } from '@cc98/api'

const ListS = muiStyled(List)({
  width: '100%',
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

export default SystemList
