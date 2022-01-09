import {
  CircularProgress, IconButton
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import React from 'react'
import { WealthModel } from '../WealthModel'


interface Props {
  transferer: WealthModel
  onSendCallback: () => void
}

export default ({ transferer, onSendCallback }: Props) => {
  return (
    <>
      <IconButton onClick={onSendCallback}>
        {!transferer.state.isSending && <SendIcon />}
        {transferer.state.isSending && <CircularProgress size={24} />}
      </IconButton>
    </>
  )
}
