import useModel from '@/hooks/useModel'
import ListS from '@/hotfix/List'
import historyModel from '@/models/history'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, ListItemButton, ListItemSecondaryAction, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'


const ListItemButtonS = muiStyled(ListItemButton)({
  paddingRight: 0
})

const ListItemSecondaryActionS = muiStyled(ListItemSecondaryAction).attrs({
})({
  right: 0,
  width: 48,
  height: 48
})

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle2',
  color: 'textPrimary',
})({})

const SubTitle = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({
  marginTop: 4,
})

const History: React.FC = () => {
  const { historyList } = useModel(historyModel)

  function clamp(str: string) {
    if (str.length <= 20) {
      return str
    }
    return `${str.slice(0, 20)}...`
  }

  return (
    <ListS>
      {historyList.map(item => (
        <ListItemButtonS key={item.id} onClick={() => navigate(`/topic/${item.id}`)}>
          <TitleArea>
            <Title>{clamp(item.title)}</Title>
            <SubTitle>{`${dayjs(item.lastViewTime).fromNow()}`}</SubTitle>
          </TitleArea>
          <ListItemSecondaryActionS>
            <IconButton onClick={() => historyModel.DELETE(item.id)} size="large">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryActionS>
        </ListItemButtonS>
      ))}
    </ListS>
  );
}

export default History
