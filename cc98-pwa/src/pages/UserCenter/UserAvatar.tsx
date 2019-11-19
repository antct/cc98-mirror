import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import { Avatar, IconButton, Typography, CircularProgress } from '@material-ui/core'

import ExpandPanel from './ExpandPanel'

import useFetcher from '@/hooks/useFetcher'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import EditIcon from '@material-ui/icons/Edit'
import ChatIcon from '@material-ui/icons/Chat'

import { getSignState, signIn } from '@/services/global'
import { followUser, unFollowUser } from '@/services/user'
import { IUser, ISignIn } from '@cc98/api'

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 24px;
  margin-bottom: 0;
`

const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
`

const ButtonDiv = styled.div`
  margin-right: -10px;
`

const AvatarS = muiStyled(Avatar)({
  width: 70,
  height: 70,
  marginRight: 20,
})

interface Props {
  info: IUser
  isUserCenter: boolean
}

const UserAvatar: React.FC<Props> = ({ info, isUserCenter }) => {
  const [signState, setSignState] = useFetcher(isUserCenter ? () => getSignState() : null)
  const [isFollowing, setIsFollowing] = useState(info.isFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSign, setIsLoadingSign] = useState(false)
  const toggleSign = async () => {
    // here a bug when first signin
    if (signState && !signState.hasSignedInToday) {
      if (isLoadingSign) {
        return
      }
      setIsLoadingSign(true)

      const res = await signIn()
      res
        .fail(() => setIsLoadingSign(false))
        .succeed((newSignState) => {
          setSignState(newSignState)
          setIsLoadingSign(false)
        })
    } else {
      return
    }
  }
  const toggleFunc = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    if (isFollowing) {
      const res = await unFollowUser(info.id)
      res
        .fail(() => setIsLoading(false))
        .succeed(() => {
          setIsFollowing(false)
          setIsLoading(false)
        })
    } else {
      const res = await followUser(info.id)
      res
        .fail(() => setIsLoading(false))
        .succeed(() => {
          setIsFollowing(true)
          setIsLoading(false)
        })
    }
  }

  const buttonsJSX = isUserCenter ? (
    <>
      <IconButton onClick={toggleSign}>
        {isLoadingSign ? (
          <CircularProgress size={20} />
        ) : (
            <FingerprintIcon color={(signState && signState.hasSignedInToday) ? 'secondary' : 'disabled'} />
          )}
      </IconButton>
      <IconButton onClick={() => navigate('/userCenter/edit')}>
        <EditIcon />
      </IconButton>
    </>
  ) : (
      <>
        <IconButton onClick={toggleFunc}>
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
              <FavoriteIcon color={isFollowing ? 'secondary' : 'disabled'} />
            )}
        </IconButton>
        <IconButton onClick={() => navigate(`/messageDetail/${info.id}`)}>
          <ChatIcon />
        </IconButton>
      </>
    )

  return (
    <ExpandPanel expanded>
      <WrapperDiv>
        <AvatarDiv>
          <AvatarS src={info.portraitUrl} />
          <Typography variant="h6">{info.name}</Typography>
        </AvatarDiv>
        <ButtonDiv>{buttonsJSX}</ButtonDiv>
      </WrapperDiv>
    </ExpandPanel>
  )
}

export default UserAvatar
