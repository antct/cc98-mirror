import React from 'react'
import { navigate } from '@/utils/history'
import muiStyled from '@/muiStyled'
import styled from 'styled-components'

import { List, ListItem, ListItemIcon, Divider, Avatar, Typography } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import Event from '@material-ui/icons/Event'

import { IRecommendationReading } from '@cc98/api'

import dayjs from 'dayjs'

const AvatarS = muiStyled(Avatar)({
  backgroundColor: '#999',
})

const ListItemTextS = muiStyled(ListItemText)({
  padding: 0,
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

const SubTitle = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({
  marginTop: 4,
})

const Info1 = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({})

const Info2 = Info1

interface Props {
  recommendationReading: IRecommendationReading[]
}
export default (props: Props) => (
  <List>
    <ListItem>
      <ListItemIcon>
        <Event />
      </ListItemIcon>
      <ListItemText primary="推荐阅读" />
    </ListItem>
    <Divider />

    {props.recommendationReading.map((info: IRecommendationReading) => {
      let url = info.imageUrl
      let name = url.slice(url.lastIndexOf('/') + 2, url.lastIndexOf('.'))
      let boardName = decodeURI(name)
      let time = dayjs(info.time).fromNow()
      return (

        <ListItemS button divider onClick={() => navigate(info.url)}>
          <TitleArea>
            <Title>{info.title}</Title>
            <SubTitle>{info.content}</SubTitle>
          </TitleArea>
          <InfoArea>
            <Info1>{time}</Info1>
            <Info2>{boardName}</Info2>
          </InfoArea>
        </ListItemS>
      )
    })}
  </List>
)
