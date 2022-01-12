import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { getUserInfoById } from '@/services/user'
import { navigate } from '@/utils/history'
import { IMessageContent, IUser } from '@cc98/api'
import { Avatar, ListItem, ListItemAvatar } from '@material-ui/core'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'

const ListItemS = muiStyled(ListItem)({
  flexShrink: 0,
})

const ListItemAvatarS = muiStyled(ListItemAvatar)({
  alignSelf: 'flex-start',
})

const MessageRoot = styled.div`
  width: 50%;
  max-width: 30em;
  min-width: 15em;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`

const MessageContent = styled.div`
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
`

const MessageContentLeft = styled(MessageContent)`
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

const MessageContentRight = styled(MessageContent)`
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

// TODO: 消息气泡
const renderItem = (message: IMessageContent, userInfo: IUser, isCurrSend: boolean, useCompress: boolean) =>
  !isCurrSend ? (
    <ListItemS button>
      <LazyLoad height={'100%'} offset={100} once>
        <ListItemAvatarS>
          <Avatar src={`${userInfo.portraitUrl}?compress=${useCompress}&width=50`} onClick={() => navigate(`/user/${userInfo.id}`)} />
        </ListItemAvatarS>
      </LazyLoad>
      <MessageRoot>
        <MessageContentLeft>{message.content}</MessageContentLeft>
        <MessageDate right>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate>
      </MessageRoot>
    </ListItemS>
  ) : (
    <ListItemS button>
      <ListItemText />
      <MessageRoot>
        <MessageContentRight>{message.content}</MessageContentRight>
        <MessageDate>{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}</MessageDate>
      </MessageRoot>
      <LazyLoad height={'100%'} offset={100} once>
        <ListItemAvatarS>
          <Avatar src={`${userInfo.portraitUrl}?compress=${useCompress}&width=50`} />
        </ListItemAvatarS>
      </LazyLoad>
    </ListItemS>
  )

export default ({ message }: Props) => {
  const { myInfo } = useModel(userModel)
  const { useCompress } = useModel(settingModel, ['useCompress'])

  const [userInfo] = useFetcher(() => getUserInfoById(message.senderId))
  if (userInfo === null || myInfo === null) {
    return null
  }

  return renderItem(message, userInfo, myInfo.id === message.senderId, useCompress)
}
