import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { navigate } from '@/utils/history'
import { IUser } from '@cc98/api'
import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
`

interface Props {
  data: IUser
}

export default ({ data }: Props) => {
  const { id, name, portraitUrl, lastLogOnTime, signatureCode } = data
  const { TRANS_IMG } = settingModel
  const fixSignatureCode = signatureCode.replace(/\[.*?\]/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')

  return (
    <ListItem button divider onClick={() => navigate(`/user/${id}`)}>
      <LazyLoad height={'100%'} offset={200} once>
        <ListItemAvatar>
          <Avatar src={TRANS_IMG(portraitUrl, true)} children={false} />
        </ListItemAvatar>
      </LazyLoad>
      <ListItemText primary={name} secondary={<Text>{`${fixSignatureCode}`}</Text>} />
      {<ListItemSecondaryAction>
        <ListItemText secondary={dayjs(lastLogOnTime).fromNow()} />
      </ListItemSecondaryAction>}
    </ListItem>
  )
}