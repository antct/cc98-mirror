import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import muiStyled from '@/muiStyled'
import { getBoardTags } from '@/services/board'
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, IconButton, InputBase, MenuItem, Select, Switch, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import React, { useState } from 'react'
import styled from 'styled-components'
import { MetaInfoModel } from './MetaInfoModel'
import ScrollTag from './ScrollTag'
import SelectType from './SelectType'


const InputArea = muiStyled(InputBase).attrs({
  fullWidth: true,
})({
  padding: '4px 8px',
  border: '1.5px solid #ccc',
})

const ChipS = muiStyled(Chip).attrs({
})({
  marginTop: 5,
  marginRight: 5
})

const IconButtonS = muiStyled(IconButton).attrs({
})({
  padding: 7
})

export { MetaInfoModel }

const SelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 8px;
`

const VoteDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

const OptionDiv = styled.div`
  margin-bottom: 8px;
`

const TagSelectDiv = styled.div``

interface Props {
  model: MetaInfoModel
  /**
   * 版面 ID
   */
  boardId: number
}

export default ({ model, boardId }: Props) => {
  useModel(model)

  const [boardTags] = useFetcher(() => getBoardTags(boardId))

  const [open, setOpen] = useState(false)
  const [word, setWord] = useState('')

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    model.setTitle(event.target.value)
  }

  const onVoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    model.setIsVote(event.target.checked)
  }

  const onExpireDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (model.state.voteInfo) model.setVoteInfo({ ...model.state.voteInfo, expiredDays: parseInt(event.target.value) })
  }

  const onMaxVoteCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (model.state.voteInfo) model.setVoteInfo({ ...model.state.voteInfo, maxVoteCount: parseInt(event.target.value) })
  }

  const onNeedVoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (model.state.voteInfo) model.setVoteInfo({ ...model.state.voteInfo, needVote: event.target.checked })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleSave = () => {
    setOpen(false)
    if (word !== '') {
      if (model.state.voteInfo) model.setVoteInfo({ ...model.state.voteInfo, voteItems: model.state.voteInfo.voteItems.concat([word]) })
    }
  }

  const handleDelete = (id: number) => () => {
    if (model.state.voteInfo) model.setVoteInfo({ ...model.state.voteInfo, voteItems: model.state.voteInfo.voteItems.filter((value, index) => index !== id) })
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (boardTags === null) {
    return null
  }

  return (
    <>
      <SelectDiv>
        <div>
          <FormLabel>类型：</FormLabel>
          <SelectType value={model.state.type} onChange={type => model.setType(type)} />
        </div>

        <TagSelectDiv>
          {boardTags.length !== 0 && <FormLabel>标签：</FormLabel>}
          {boardTags[0] && (
            <ScrollTag
              tags={boardTags[0].tags}
              value={model.state.tag1}
              onChange={tag => model.setTag1(tag)}
            />
          )}
          {boardTags[1] && (
            <ScrollTag
              tags={boardTags[1].tags}
              value={model.state.tag2}
              onChange={tag => model.setTag2(tag)}
            />
          )}
        </TagSelectDiv>
        <div>
          <FormLabel>投票：</FormLabel>
          <Switch
            checked={model.state.isVote}
            onChange={onVoteChange}
            color="primary"
          />
        </div>
      </SelectDiv>
      {
        model.state.isVote && model.state.voteInfo &&
        <VoteDiv>
          <div>
            <FormLabel>有效期：</FormLabel>
            <Select
              value={model.state.voteInfo.expiredDays}
              onChange={onExpireDaysChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </div>
          <div>
            <FormLabel>最大投票数：</FormLabel>
            <Select
              onChange={onMaxVoteCountChange}
            >
              {
                model.state.voteInfo.voteItems.map((value: string, index: number) => <MenuItem value={index + 1}>{index + 1}</MenuItem>)
              }
            </Select>
          </div>
          <div>
            <FormLabel>投票后可见：</FormLabel>
            <Switch
              checked={model.state.voteInfo.needVote}
              color="primary"
              onChange={onNeedVoteChange}
            />
          </div>
          <div>
            <FormLabel>添加选项：</FormLabel>
            <IconButtonS color="primary" onClick={handleOpen}>
              <AddIcon />
            </IconButtonS>
          </div>

        </VoteDiv>
      }
      {
        model.state.isVote && model.state.voteInfo && model.state.voteInfo.voteItems.length > 0 &&
        <OptionDiv>
          {model.state.voteInfo.voteItems.map((value, index) => <ChipS label={value} onDelete={handleDelete(index)} />)}
        </OptionDiv>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>投票</DialogTitle>
        <DialogContent>
          <DialogContentText>
            输入选项
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

      <InputArea value={model.state.title} placeholder="标题" onChange={onTitleChange} />
    </>
  )
}