import React from 'react'
import muiStyled from '@/muiStyled'

import { WealthModel } from './WealthModel'

import { InputBase } from '@material-ui/core'

const InputArea = muiStyled(InputBase).attrs({
  fullWidth: true,
  multiline: true,
  autoFocus: true,
  rows: 1,
  rowsMax: 10,
})({
  marginTop: 8,
  padding: '12px 8px',
  border: '1.5px solid #ccc',
})

interface Props {
  transferer: WealthModel
}

export default ({ transferer }: Props) => {
  const handlerWealthChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    transferer.setWealth(event.target.value)
  }
  const handlerReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    transferer.setReason(event.target.value)
  }
  const handlerUserNamesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    transferer.setUserNames(event.target.value)
  }

  return (
    <>
    <InputArea
      value={transferer.state.userNames}
      placeholder="转账用户，多个用户以空格隔开"
      onChange={handlerUserNamesChange}
      autoFocus={true}
    />
    <InputArea
      value={transferer.state.wealth}
      placeholder="转账金额"
      onChange={handlerWealthChange}
      autoFocus={false}
    />
    <InputArea
      value={transferer.state.reason}
      placeholder="转账理由"
      onChange={handlerReasonChange}
      autoFocus={false}
    />
    </>
  )
}
