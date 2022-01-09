import muiStyled from '@/muiStyled'
import UBB from '@/UBB'
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, IconButton
} from '@material-ui/core'
import TransformIcon from '@material-ui/icons/Transform'
import React, { useState } from 'react'
import { EditorModel } from '../EditorModel'


const DialogContentTextS = muiStyled(DialogContentText)({
  minHeight: 160,
})

interface PreviewProps {
  content: string
  handleClose: () => void
}

const Preview = ({ content, handleClose }: PreviewProps) => (
  <>
    <DialogContent>
      <DialogContentTextS>
        <UBB ubbText={content || '[ 没有内容 ]'} />
      </DialogContentTextS>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={handleClose}>
        关闭预览
      </Button>
    </DialogActions>
  </>
)

interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  function clickHandler() {
    setOpen(true)
  }

  return (
    <>
      <IconButton onClick={clickHandler}>
        <TransformIcon />
      </IconButton>
      <Dialog open={open} fullWidth scroll="paper">
        <Preview content={editor.fullContent} handleClose={handleClose} />
      </Dialog>
    </>
  )
}
