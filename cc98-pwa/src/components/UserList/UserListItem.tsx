import React from 'react'
import styled from 'styled-components'
import { navigate } from '@/utils/history'

import dayjs from 'dayjs'

import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core'

import ListItemText from '@/hotfix/ListItemText'

import useFetcher from '@/hooks/useFetcher'

import { getUserInfoById } from '@/services/user'

const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

interface Props {
  data: number
}

const navigateToDetail = (userId: number) => navigate(`/user/${userId}`)

export default ({ data }: Props) => {
  const [userInfo] = useFetcher(() => getUserInfoById(data))
  if (userInfo === null) {
    return null
  }
  const { name, portraitUrl, lastLogOnTime, signatureCode } = userInfo
  let fixSignatureCode = signatureCode.replace(/\[.*?\]/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')

  return (
    <ListItem button divider onClick={() => navigateToDetail(data)}>
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
