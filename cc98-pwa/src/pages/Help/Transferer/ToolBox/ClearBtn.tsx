import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Dialog, DialogActions, DialogContent,
  DialogContentText, IconButton,
  Tooltip
} from '@mui/material'
import React, { useState } from 'react'
import { WealthModel } from '../WealthModel'


interface Props {
  transferer: WealthModel
}

export default ({ transferer }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const handlerComfirm = () => {
    transferer.clearAll()
    handleClose()
  }

  function clickHandler() {
    setOpen(true)
  }

  return <>
    <Tooltip title='清空' placement='bottom'>
      <IconButton onClick={clickHandler} size="large">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>确认要清空已输入的内容吗？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handlerComfirm} color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  </>
}
