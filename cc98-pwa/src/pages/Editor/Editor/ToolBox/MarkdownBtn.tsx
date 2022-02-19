import muiStyled from '@/muiStyled'
import WrapTextIcon from '@mui/icons-material/WrapText'
import {
  Button,
  Dialog, DialogActions, DialogContent,
  DialogContentText, IconButton,
  Tooltip
} from '@mui/material'
import React, { useState } from 'react'
import { EditorModel } from '../EditorModel'

const DialogActionsS = muiStyled(DialogActions)({
  display: 'flex',
  flexDirection: 'column'
})

interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const handleUBB = () => {
    handleClose()
    editor.setContentType(0)
  }

  const handleMarkdown = () => {
    handleClose()
    editor.setContentType(1)
  }

  function clickHandler() {
    setOpen(true)
  }

  return <>
    <Tooltip title='文本类型' placement='bottom'>
      <IconButton onClick={clickHandler} size="large">
        <WrapTextIcon />
      </IconButton>
    </Tooltip>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{`切换富文本类型`}</DialogContentText>
      </DialogContent>
      <DialogActionsS>
        <Button onClick={handleUBB} color="primary">
          UBB
        </Button>
        <Button onClick={handleMarkdown} color="primary">
          Markdown
        </Button>
      </DialogActionsS>
    </Dialog>
  </>;
}
