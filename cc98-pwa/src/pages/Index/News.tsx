import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IRecommendationReading } from '@cc98/api'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'

const ListS = muiStyled(List)({
  paddingTop: 0,
  paddingBottom: 0,
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
  schoolNews: IRecommendationReading[]
}
export default (props: Props) => {
  const { showSchoolNews } = useModel(settingModel, ['showSchoolNews'])
  const { TOGGLE_SCHOOLNEWS } = settingModel

  return (
    <ListS>
      <ListItem button onClick={TOGGLE_SCHOOLNEWS}>
        <ListItemIcon>
          {
            showSchoolNews ? (<VolumeUpIcon />) : (<VolumeOffIcon />)
          }
        </ListItemIcon>
        <ListItemText primary="校园新闻" />
      </ListItem>
      <Divider />

      {showSchoolNews && props.schoolNews.map((info: IRecommendationReading) => {
        return (
          <ListItemS button divider onClick={() => navigate(info.url)}>
            <TitleArea>
              <Title>{info.title}</Title>
            </TitleArea>
            <InfoArea>
              <Info1>{dayjs(info.time).fromNow()}</Info1>
            </InfoArea>
          </ListItemS>
        )
      })}
    </ListS>
  )
}
