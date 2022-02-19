import {
  CircularProgress,
  Dialog, IconButton, List,
  ListItem,
  ListItemText, Tooltip
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import React, { useState } from 'react'
import { EditorModel } from '../EditorModel'


interface DialogProps {
  onClose: (value: string) => void
  selectedValue: string
  open: boolean
  options: string[]
}

const postOptions = ['普通发帖', '匿名发帖']
const replyOptions = ['普通回复', '匿名回复']

function SimpleDialog({ onClose, selectedValue, open, options }: DialogProps) {

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <List>
        {options.map((option) => (
          <ListItem button onClick={() => handleListItemClick(option)} key={option}>
            <ListItemText primary={option} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

interface Props {
  editor: EditorModel
  onSendCallback: () => void
}

export default ({ editor, onSendCallback }: Props) => {

  const [open, setOpen] = useState(false)
  const options = editor.state.anonymousAction == 1 ? replyOptions : (editor.state.anonymousAction == 2 ? postOptions : [''])
  const [selectedValue, setSelectedValue] = useState(options[0])

  const handleClose = (value: string) => {
    setOpen(false)
    editor.setState({ anonymousSend: value == options[1], isSending: true })
    onSendCallback()
  }

  function clickHandler() {
    if (editor.state.anonymousState == 2 && editor.state.anonymousAction !== 0) {
      setOpen(true)
    } else {
      editor.setState({ isSending: true })
      onSendCallback()
    }
  }

  return <>
    <SimpleDialog
      selectedValue={selectedValue}
      open={open}
      onClose={handleClose}
      options={options}
    />
    <Tooltip title='发送' placement='bottom'>
      <IconButton onClick={clickHandler} size="large">
        {!editor.state.isSending && <SendIcon />}
        {editor.state.isSending && <CircularProgress size={24} />}
      </IconButton>
    </Tooltip>
  </>;
}
