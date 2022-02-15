import useModel from '@/hooks/useModel'
import ListS from '@/hotfix/List'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IRecommendationReading } from '@cc98/api'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
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
          <ListItemButtonS divider onClick={() => navigate(info.url)}>
            <TitleArea>
              <Title>{info.title}</Title>
            </TitleArea>
            <InfoArea>
              <Info1>{dayjs(info.time).fromNow()}</Info1>
            </InfoArea>
          </ListItemButtonS>
        )
      })}
    </ListS>
  )
}
