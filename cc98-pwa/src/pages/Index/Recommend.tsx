import useModel from '@/hooks/useModel'
import ListS from '@/hotfix/List'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IRecommendationReading } from '@cc98/api'
import { Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import React from 'react'
import styled from 'styled-components'


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
export default (props: Props) => {
  const { showRecommend } = useModel(settingModel, ['showRecommend'])
  const { TOGGLE_RECOMMEND } = settingModel

  return (
    <ListS>
      <ListItem button onClick={TOGGLE_RECOMMEND}>
        <ListItemIcon>
          {
            showRecommend ? (<VolumeUpIcon />) : (<VolumeOffIcon />)
          }
        </ListItemIcon>
        <ListItemText primary="推荐阅读" />
      </ListItem>
      <Divider />

      {showRecommend && props.recommendationReading.map((info: IRecommendationReading) => {
        const url = info.imageUrl
        const name = url.slice(url.lastIndexOf('/') + 2, url.lastIndexOf('.'))
        const boardName = decodeURI(name)
        return (

          <ListItemS button divider onClick={() => navigate(info.url)}>
            <TitleArea>
              <Title>{info.title}</Title>
              <SubTitle>{info.content}</SubTitle>
            </TitleArea>
            <InfoArea>
              <Info1>{info.id}</Info1>
              <Info2>{boardName}</Info2>
            </InfoArea>
          </ListItemS>
        )
      })}
    </ListS>
  )
}
