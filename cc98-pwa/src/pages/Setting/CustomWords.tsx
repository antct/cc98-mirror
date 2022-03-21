import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItem, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircle'
import React, { useState } from 'react'

const TypographyS = muiStyled(Typography).attrs({
})({
  margin: '0px 16px',
  whiteSpace: 'normal'
})

const ChipS = muiStyled(Chip).attrs({
})({
  marginTop: 5,
  marginRight: 5
})


export default () => {
  const { customWords } = useModel(settingModel, ['customWords'])
  const { ADD_CUSTOMWORD, DELETE_CUSTOMWORD } = settingModel
  const [open, setOpen] = useState(false)
  const [word, setWord] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleSave = () => {
    setOpen(false)
    if (word !== '') ADD_CUSTOMWORD(word)
  }

  const handleDelete = (index: number) => () => {
    DELETE_CUSTOMWORD(index)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return <>
    <ListItem>
      <ListItemText primary="订阅关键词" secondary="高亮显示自定义词" />
      <IconButton color="primary" onClick={handleOpen} size="large">
        <AddIcon />
      </IconButton>
    </ListItem>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>订阅</DialogTitle>
      <DialogContent>
        <DialogContentText>
          输入你想高亮提醒的订阅词
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          fullWidth
          variant="standard"
          onChange={e => setWord(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>关闭</Button>
        <Button onClick={handleSave}>保存</Button>
      </DialogActions>
    </Dialog>
    <TypographyS>
      {
        customWords.map((value, index) => <ChipS label={value} onDelete={handleDelete(index)} />)
      }
    </TypographyS>
  </>;
}
