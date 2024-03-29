import muiStyled from '@/muiStyled'
import { rate } from '@/services/post'
import { rateHandler } from '@/services/utils/errorHandler'
import { IPost } from '@cc98/api'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
  TextField
} from '@mui/material'
import React, { useState } from 'react'

const TabS = muiStyled(Tab)({
  flexGrow: 1,
})

const TextFieldS = muiStyled(TextField).attrs({
  fullWidth: true,
})({
  marginTop: 16,
})

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 关闭 Dialog
   */
  handleClose: () => void
  /**
   * 更新 postInfo
   */
  refreshPost: () => void
}

const Judge: React.FC<Props> = ({ postInfo, handleClose, refreshPost }) => {
  const [point, setPoint] = useState<1 | -1>(1)

  const handlePointChange = (_: React.ChangeEvent, value: 1 | -1) => {
    setPoint(value)
  }

  const [reason, setReason] = useState('')
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value)
  }

  const submitJudge = async () => {
    const res = await rate(postInfo.id, point, reason)
    res.fail(rateHandler).succeed(() => {
      handleClose()
      refreshPost()
    })
  }

  return (
    <Dialog open={true} onClose={handleClose} style={{ zIndex: 1010 }}>
      <DialogTitle>评分</DialogTitle>
      <DialogContent>
        <DialogContentText>评分需要发帖数达到500以上，您每天有一次评分机会</DialogContentText>
        <Tabs value={point} onChange={handlePointChange}>
          <TabS label="+1" value={1} />
          <TabS label="-1" value={-1} />
        </Tabs>
        <TextFieldS label="请输入理由" onChange={handleTextChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={submitJudge} color="primary">
          提交
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Judge
