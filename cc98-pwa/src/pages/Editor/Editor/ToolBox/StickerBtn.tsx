import { Dialog, IconButton } from '@mui/material'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import React, { useState } from 'react'
import { EditorModel } from '../EditorModel'
import StickerBox from './StickerBox'


interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  function clickHandler() {
    setOpen(!open)
  }

  return <>
    <IconButton onClick={clickHandler} size="large">
      <TagFacesIcon />
    </IconButton>
    <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
      <StickerBox editor={editor} handleClose={handleClose} />
    </Dialog>
  </>;
}
