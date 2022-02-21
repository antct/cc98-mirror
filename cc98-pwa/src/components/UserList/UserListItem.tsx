import { ONLINE_TIME } from '@/config'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IUser } from '@cc98/api'
import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, Typography } from '@mui/material'
import Badge from '@mui/material/Badge'
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import dayjs from 'dayjs'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '75%',
        height: '75%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge)

const Text = styled.span`
  display: block;
  max-width: 80%;
  overflow: hidden;
  white-space: pre-wrap;
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
          {dayjs().diff(dayjs(lastLogOnTime), 'minute') <= ONLINE_TIME ?
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar src={TRANS_IMG(portraitUrl, true)} children={false} />
            </StyledBadge>
            :
            <Avatar src={TRANS_IMG(portraitUrl, true)} children={false} />
          }
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
