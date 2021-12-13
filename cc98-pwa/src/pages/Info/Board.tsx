import React, { useState, useEffect } from 'react'
import { navigate } from '@/utils/history'
import muiStyled from '@/muiStyled'
import styled from 'styled-components'

import {
  List, ListItem, ListItemIcon, Divider, Typography
} from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'

import { getBoardNameById } from '@/services/board'

import { IBasicTopic } from '@cc98/api'

const ListS = muiStyled(List)({
  paddingTop: '0px',
  paddingBottom: '0px',
})

const ListItemS = muiStyled(ListItem)({
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
    <ListItem>
      <ListItemIcon onClick={props.func}>
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
        <ListItemS button divider onClick={() => navigate(`/topic/${info.id}`)}>
          <TitleArea>
            <Title>{info.title}</Title>
          </TitleArea>

          <InfoArea>
            <Info1>{boardName}</Info1>
          </InfoArea>
        </ListItemS>
      )
    })}

  </ListS>
  )
}
