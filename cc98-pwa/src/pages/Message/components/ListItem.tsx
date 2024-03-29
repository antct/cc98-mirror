import { CLAMP } from '@/config'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { navigate } from '@/utils/history'
import { IRecentMessage, IUser } from '@cc98/api'
import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction } from '@mui/material'
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
    <ListItem button divider onClick={() => navigateToDetail(message.userId)}>
      <LazyLoad
        height={'100%'}
        offset={200}
        once
        placeholder={<ListItemAvatar><Avatar src={undefined} children={false} imgProps={{ referrerPolicy: "no-referrer" }} /></ListItemAvatar>}
      >
        <ListItemAvatar>
          <Avatar src={TRANS_IMG(portraitUrl, true)} children={false} imgProps={{ referrerPolicy: "no-referrer" }} />
        </ListItemAvatar>
      </LazyLoad>
      <ListItemText primary={name} secondary={<Text>{CLAMP(message.lastContent.replace(/\[.*?\]/g, ''))}</Text>} />
      <ListItemSecondaryAction>
        <ListItemText secondary={dayjs(message.time).fromNow()} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}