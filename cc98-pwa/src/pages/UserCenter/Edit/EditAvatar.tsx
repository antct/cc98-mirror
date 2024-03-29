import muiStyled from '@/muiStyled'
import { IUser } from '@cc98/api'
import { Avatar, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import ForumAvatarButton from './ForumAvatarButton'
import LocalAvatarButton from './LocalAvatarButton'

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 36px 16px;
  padding-top: 0;
`

const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
`

const AvatarS = muiStyled(Avatar)({
  width: 70,
  height: 70,
  marginRight: 20,
})

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -10px;
`

interface Props {
  info: IUser
  handleAvatarSubmit: (AvatarSrc: string) => void
}

const EditAvatar: React.FC<Props> = ({ info, handleAvatarSubmit }) => (
  <WrapperDiv>
    <AvatarDiv>
      <AvatarS src={info.portraitUrl} children={false} imgProps={{ referrerPolicy: "no-referrer" }} />
      <Typography variant="h6">{info.name}</Typography>
    </AvatarDiv>
    <ButtonDiv>
      <ForumAvatarButton handleAvatarSubmit={handleAvatarSubmit} />
      <LocalAvatarButton handleAvatarSubmit={handleAvatarSubmit} />
    </ButtonDiv>
  </WrapperDiv>
)

export default EditAvatar