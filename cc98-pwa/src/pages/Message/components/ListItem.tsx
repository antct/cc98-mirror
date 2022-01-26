import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { navigate } from '@/utils/history'
import { IRecentMessage, IUser } from '@cc98/api'
import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core'
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

interface Props {
  message: IRecentMessage
  user: IUser
}

const navigateToDetail = (userId: number) => navigate(`/messageDetail/${userId}`)

export default ({ message, user }: Props) => {
  // const [userInfo] = useFetcher(() => getUserInfoById(message.userId))
  // if (userInfo === null) {
  //   return null
  // }
  if (message === null || message === undefined) {
    return null
  }
  if (user === null || user === undefined) {
    return null
  }
  const { name, portraitUrl } = user
  const { TRANS_IMG } = settingModel

  return (
    <ListItem button onClick={() => navigateToDetail(message.userId)}>
      <LazyLoad height={'100%'} offset={200} once>
        <ListItemAvatar>
          <Avatar src={TRANS_IMG(portraitUrl, true)} />
        </ListItemAvatar>
      </LazyLoad>
      <ListItemText primary={name} secondary={<Text>{message.lastContent}</Text>} />
      <ListItemSecondaryAction>
        <ListItemText secondary={dayjs(message.time).fromNow()} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}