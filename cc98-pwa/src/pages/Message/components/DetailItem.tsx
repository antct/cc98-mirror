import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { getUserInfoById } from '@/services/user'
import UBB from '@/UBB'
import { navigate } from '@/utils/history'
import { IMessageContent } from '@cc98/api'
import { Avatar, ListItemAvatar, ListItemButton } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

const ListItemButtonS = muiStyled(ListItemButton)({
  flexShrink: 0,
})

const ListItemAvatarS = muiStyled(ListItemAvatar)({
  alignSelf: 'flex-start',
  minWidth: 40,
})

const MessageRoot = styled.div`
  width: 50%;
  max-width: 30em;
  min-width: 15em;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`

const MessageContentLeft = styled.div`
  background-color: #eee;
  line-height: 2em;
  padding: 0.25em 0.5em;
  position: relative;
  font-size: 0.85em;
  border-radius: 3px;
  min-height: 3em;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  word-break: break-all;
  &::before {
    content: '';
    border-style: solid;
    border-width: 0.5em 0.5em 0.5em 0;
    border-color: transparent;
    border-right-color: #eee;
    left: -0.4em;
    position: absolute;
    top: 1em;
  }
`

const MessageContentRight = styled.div`
  background-color: #eee;
  line-height: 2em;
  padding: 0.25em 0.5em;
  position: relative;
  font-size: 0.85em;
  border-radius: 3px;
  min-height: 3em;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  word-break: break-all;
  &::after {
    content: '';
    border-style: solid;
    border-width: 0.5em 0 0.5em 0.5em;
    border-color: transparent;
    border-left-color: #eee;
    right: -0.4em;
    position: absolute;
    top: 1em;
  }
`

const MessageDate = styled.span<{ right?: boolean }>`
  color: #aaa;
  font-size: 0.7em;
  align-self: ${props => (props.right ? 'flex-end' : '')};
`

interface Props {
  message: IMessageContent
}

export default ({ message }: Props) => {
  const { myInfo } = useModel(userModel)
  const { TRANS_IMG } = settingModel

  const [userInfo] = useFetcher(() => getUserInfoById(message.senderId))
  if (userInfo === null || myInfo === null) {
    return null
  }
  return !(myInfo.id === message.senderId) ? (
    <ListItemButtonS>
      <LazyLoad height={'100%'} offset={200} once>
        <ListItemAvatarS>
          <Avatar src={TRANS_IMG(userInfo.portraitUrl, true)} onClick={() => navigate(`/user/${userInfo.id}`)} children={false} />
        </ListItemAvatarS>
      </LazyLoad>
      <MessageRoot>
        <MessageContentLeft>
          <UBB ubbText={message.content} />
        </MessageContentLeft>
        <MessageDate right>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate>
      </MessageRoot>
    </ListItemButtonS>
  ) : (
    <ListItemButtonS>
      <ListItemText />
      <MessageRoot>
        <MessageContentRight>
          <UBB ubbText={message.content} />
        </MessageContentRight>
        <MessageDate>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate>
      </MessageRoot>
      <LazyLoad height={'100%'} offset={200} once>
        <ListItemAvatarS>
          <Avatar src={TRANS_IMG(userInfo.portraitUrl, true)} children={false} />
        </ListItemAvatarS>
      </LazyLoad>
    </ListItemButtonS>
  )
}
