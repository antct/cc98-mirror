import React from 'react'
import styled from 'styled-components'
import { navigate } from '@/utils/history'

import dayjs from 'dayjs'

import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core'

import ListItemText from '@/hotfix/ListItemText'

import useFetcher from '@/hooks/useFetcher'

import { getUserInfoByName } from '@/services/user'
import { IUser } from '@cc98/api'

const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

interface Props {
  data: IUser
}

export default ({ data }: Props) => {
  const { id, name, portraitUrl, lastLogOnTime, signatureCode } = data
  let fixSignatureCode = signatureCode.replace(/\[.*?\]/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')

  return (
    <ListItem button divider onClick={() => navigate(`/user/name/${name}`)}>
      <ListItemAvatar>
        <Avatar src={portraitUrl} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={<Text>{`${fixSignatureCode}`}</Text>}/>
      { <ListItemSecondaryAction>
        <ListItemText secondary={dayjs(lastLogOnTime).fromNow()} />
      </ListItemSecondaryAction> }
    </ListItem>
  )
}