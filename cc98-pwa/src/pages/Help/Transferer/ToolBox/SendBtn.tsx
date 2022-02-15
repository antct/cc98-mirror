import {
  CircularProgress, IconButton
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import React from 'react'
import { WealthModel } from '../WealthModel'


interface Props {
  transferer: WealthModel
  onSendCallback: () => void
}

export default ({ transferer, onSendCallback }: Props) => {
  return <>
    <IconButton onClick={onSendCallback} size="large">
      {!transferer.state.isSending && <SendIcon />}
      {transferer.state.isSending && <CircularProgress size={24} />}
    </IconButton>
  </>;
}
