import SendIcon from '@mui/icons-material/Send'
import {
  CircularProgress, IconButton, Tooltip
} from '@mui/material'
import React from 'react'
import { WealthModel } from '../WealthModel'


interface Props {
  transferer: WealthModel
  onSendCallback: () => void
}

export default ({ transferer, onSendCallback }: Props) => {
  return <>
    <Tooltip title='转账' placement='bottom'>
      <IconButton onClick={onSendCallback} size="large">
        {!transferer.state.isSending && <SendIcon />}
        {transferer.state.isSending && <CircularProgress size={24} />}
      </IconButton>
    </Tooltip>
  </>;
}
