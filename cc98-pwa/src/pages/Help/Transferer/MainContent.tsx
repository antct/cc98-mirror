import muiStyled from '@/muiStyled'
import { Card, CardContent, InputBase, Typography } from '@material-ui/core'
import React from 'react'
import { WealthModel } from './WealthModel'


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
    <Card>
      <CardContent>
        <Typography>
          1. 转账需要收取一定的手续费，手续费金额为10% 或者 10 中的较大值。
        </Typography>
        <Typography>
          2. 转账手续费从转账金额中收取，因此对方实际收到的金额会少于您输入的金额。
        </Typography>
        <Typography>
          3. 转账的最小金额不能小于10。
        </Typography>
        <Typography>
          4. 可以对多人转账，请在收款人一栏用空格隔开每个用户。多人转账时每个用户都会收到您指定的金额并单独扣除手续费。您最多可以同时向 10 个用户进行转账。
        </Typography>
      </CardContent>
    </Card>
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
