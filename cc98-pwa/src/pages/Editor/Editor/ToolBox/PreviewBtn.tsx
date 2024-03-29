import muiStyled from '@/muiStyled'
import UBB from '@/UBB'
import TransformIcon from '@mui/icons-material/Transform'
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, IconButton, Tooltip
} from '@mui/material'
import React, { useState } from 'react'
import MarkdownView from 'react-showdown'
import { EditorModel } from '../EditorModel'


const DialogContentTextS = muiStyled(DialogContentText)({
  minHeight: 160,
})

interface PreviewProps {
  content: string
  contentType: number
  handleClose: () => void
}

const Preview = ({ content, contentType, handleClose }: PreviewProps) => (
  <>
    <DialogContent>
      <DialogContentTextS>
        {contentType === 0 ? <UBB ubbText={content} /> : <MarkdownView markdown={content} />}
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

  return <>
    <Tooltip title='预览' placement='bottom'>
      <IconButton onClick={clickHandler} size="large">
        <TransformIcon />
      </IconButton>
    </Tooltip>
    <Dialog open={open} fullWidth scroll="paper">
      <Preview content={editor.fullContent} contentType={editor.state.contentType} handleClose={handleClose} />
    </Dialog>
  </>;
}
