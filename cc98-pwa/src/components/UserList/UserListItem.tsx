import React from 'react'
import styled from 'styled-components'
import { navigate } from '@/utils/history'

import dayjs from 'dayjs'

import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core'

import ListItemText from '@/hotfix/ListItemText'

import LazyLoad from 'react-lazyload'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

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

const navigateToDetail = (userId: number) => navigate(`/user/${userId}`)

export default ({ data }: Props) => {
  // const [userInfo] = useFetcher(() => getUserInfoById(data))
  // if (userInfo === null) {
  //   return null
  // }
  const { name, portraitUrl, lastLogOnTime, signatureCode } = data
  const { useCompress } = useModel(settingModel, ['useCompress'])
  let fixSignatureCode = signatureCode.replace(/\[.*?\]/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')

  return (
    <ListItem button divider onClick={() => navigateToDetail(data.id)}>
      <LazyLoad height={'100%'} offset={200}>
        <ListItemAvatar>
          <Avatar src={`${portraitUrl}?compress=${useCompress}&width=50`} />
        </ListItemAvatar>
      </LazyLoad>
      <ListItemText primary={name} secondary={<Text>{`${fixSignatureCode}`}</Text>}/>
      { <ListItemSecondaryAction>
        <ListItemText secondary={dayjs(lastLogOnTime).fromNow()} />
      </ListItemSecondaryAction> }
    </ListItem>
  )
}
