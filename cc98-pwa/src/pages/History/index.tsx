import useModel from '@/hooks/useModel'
import historyModel from '@/models/history'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IconButton, List, ListItem, ListItemSecondaryAction, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'


const ListS = muiStyled(List).attrs({
})({
  paddingTop: 0,
  paddingBottom: 0
})

const ListItemS = muiStyled(ListItem).attrs({
  button: true
})({
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
        <ListItemS key={item.id} button onClick={() => navigate(`/topic/${item.id}`)}>
          <TitleArea>
            <Title>{clamp(item.title)}</Title>
            <SubTitle>{`${dayjs(item.lastViewTime).fromNow()}`}</SubTitle>
          </TitleArea>
          <ListItemSecondaryActionS>
            <IconButton onClick={() => historyModel.DELETE(item.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryActionS>
        </ListItemS>
      ))}
    </ListS>
  )
}

export default History
