import {
  Button,
  Dialog, DialogActions, DialogContent,
  DialogContentText, IconButton
} from '@material-ui/core'
import WrapTextIcon from '@material-ui/icons/WrapText'
import React, { useState } from 'react'
import { EditorModel } from '../EditorModel'


interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const handleUBB = () => {
    editor.setContentType(0)
    handleClose()
  }

  const handleMarkdown = () => {
    editor.setContentType(1)
    handleClose()
  }

  function clickHandler() {
    setOpen(true)
  }

  return (
    <>
      <IconButton onClick={clickHandler}>
        <WrapTextIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{`切换文本类型，当前为${editor.state.contentType === 0 ? 'UBB' : 'Markdown'}类型`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUBB} color="primary">
            UBB
          </Button>
          <Button onClick={handleMarkdown} color="primary">
            Markdown
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
