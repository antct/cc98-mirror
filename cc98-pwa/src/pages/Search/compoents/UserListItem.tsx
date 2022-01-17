import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { navigate } from '@/utils/history'
import { IUser } from '@cc98/api'
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
  data: IUser
}

export default ({ data }: Props) => {
  const { id, name, portraitUrl, lastLogOnTime, signatureCode } = data
  const { useCompress } = useModel(settingModel, ['useCompress'])
  const fixSignatureCode = signatureCode.replace(/\[.*?\]/g, '').replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')

  return (
    <ListItem button divider onClick={() => navigate(`/user/${id}`)}>
      <LazyLoad height={'100%'} offset={200} once>
        <ListItemAvatar>
          <Avatar src={`${portraitUrl}?compress=${useCompress}&width=${AVATAR_COMPRESS_WIDTH}`} />
        </ListItemAvatar>
      </LazyLoad>
      <ListItemText primary={name} secondary={<Text>{`${fixSignatureCode}`}</Text>}/>
      { <ListItemSecondaryAction>
        <ListItemText secondary={dayjs(lastLogOnTime).fromNow()} />
      </ListItemSecondaryAction> }
    </ListItem>
  )
}