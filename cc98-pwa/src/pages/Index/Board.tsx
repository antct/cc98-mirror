import ListS from '@/hotfix/List'
import muiStyled from '@/muiStyled'
import { getBoardNameById } from '@/services/board'
import { navigate } from '@/utils/history'
import { IBasicTopic } from '@cc98/api'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ListItemButtonS = muiStyled(ListItemButton)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '100%',
})

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 0;
  margin-left: 1em;
  text-align: right;
`

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle2',
  color: 'textPrimary',
})({
  // marginTop: 3,
  // lineHeight: 1.25,
  flexGrow: 1,
})

const Info1 = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({})

interface Props {
  name: string
  data: IBasicTopic[]
  status: boolean
  func: () => void
}

export default (props: Props) => {
  return (
    <ListS>
      <ListItem button onClick={props.func}>
        <ListItemIcon>
          {
            props.status ? (<VolumeUpIcon />) : (<VolumeOffIcon />)
          }
        </ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>
      <Divider />
      {props.status && props.data.map((info: IBasicTopic) => {
        const [boardName, setBoardName] = useState('')
        useEffect(() => {
          getBoardNameById(info.boardId).then(boardName => setBoardName(boardName))
        }, [])
        return (
          <ListItemButtonS divider onClick={() => navigate(`/topic/${info.id}`)}>
            <TitleArea>
              <Title>{info.title}</Title>
            </TitleArea>

            <InfoArea>
              <Info1>{boardName}</Info1>
            </InfoArea>
          </ListItemButtonS>
        )
      })}

    </ListS>
  )
}
