import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IUser } from '@cc98/api'
import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'


const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const Info1 = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({})

const Info2 = Info1

interface Props {
  data: IUser
  place: Place
}

export type Place = 'follower' | 'followee'

const navigateToDetail = (userId: number) => navigate(`/user/${userId}`)

export default ({ data, place }: Props) => {
  const { name, portraitUrl, lastLogOnTime, signatureCode } = data
  const { TRANS_IMG } = settingModel
  const fixSignatureCode = signatureCode.replace(/\[.*?\]/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')

  return (
    <ListItem button divider onClick={() => navigateToDetail(data.id)}>
      <LazyLoad height={'100%'} offset={200} once>
        <ListItemAvatar>
          <Avatar src={TRANS_IMG(portraitUrl, true)} />
        </ListItemAvatar>
      </LazyLoad>
      <ListItemText primary={name} secondary={<Text>{`${fixSignatureCode}`}</Text>} />
      {
        place === 'follower' && data.isFollowing ?
          <>
            {/* <InfoArea>
            <Info1>{'互关'}</Info1>
            <Info2>{dayjs(lastLogOnTime).fromNow()}</Info2>
          </InfoArea> */}
            <ListItemSecondaryAction>
              <ListItemText secondary={dayjs(lastLogOnTime).fromNow()} />
            </ListItemSecondaryAction>
          </> :
          <>
            <ListItemSecondaryAction>
              <ListItemText secondary={dayjs(lastLogOnTime).fromNow()} />
            </ListItemSecondaryAction>
          </>
      }
    </ListItem>
  )
}
