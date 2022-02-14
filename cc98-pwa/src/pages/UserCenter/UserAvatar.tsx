import useFetcher from '@/hooks/useFetcher'
import muiStyled from '@/muiStyled'
import { getSignState, signIn } from '@/services/global'
import { followUser, unFollowUser } from '@/services/user'
import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { IUser } from '@cc98/api'
import { Avatar, CircularProgress, IconButton, Typography } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import EditIcon from '@material-ui/icons/Edit'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import ExpandPanel from './ExpandPanel'


const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px 12px 0px 16px;
`

const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
`

const ButtonDiv = styled.div`
  margin-right: -12px;
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
  const [isSign, setIsSign] = useState(false)
  const [isFollowing, setIsFollowing] = useState(info.isFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSign, setIsLoadingSign] = useState(false)

  const toggleSign = async () => {
    // 签到了，或者未签到签到状态还没获取到，直接返回
    if (signState === null || isLoadingSign) return
    if (isSign || (signState && signState.hasSignedInToday)) {
      snackbar.success('今天已签到')
      return
    }
    setIsLoadingSign(true)

    const res = await signIn()
    res
      .fail(() => {
        setIsLoadingSign(false)
        snackbar.success('签到失败')
      })
      .succeed((msg) => {
        setIsSign(true)
        setIsLoadingSign(false)
        snackbar.success(`签到成功，获得${msg}财富值`)
      })
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
          <FingerprintIcon color={(isSign || (signState && signState.hasSignedInToday)) ? 'secondary' : 'disabled'} />
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
          <LazyLoad height={'100%'} offset={200} once>
            <AvatarS src={info.portraitUrl} children={false} />
          </LazyLoad>
          <Typography variant="h6">{info.name}</Typography>
        </AvatarDiv>
        <ButtonDiv>{buttonsJSX}</ButtonDiv>
      </WrapperDiv>
    </ExpandPanel>
  )
}

export default UserAvatar
