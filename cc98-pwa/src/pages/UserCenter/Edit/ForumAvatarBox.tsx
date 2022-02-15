import { IMG_BASE_URL } from '@/config'
import React from 'react'
import styled from 'styled-components'

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px 16px;
`

const Img = styled.img`
  width: 15%;
  margin: auto;
`

const ForumAvatarsUrl = [
  `${IMG_BASE_URL}/default_avatar_boy.png`,
  `${IMG_BASE_URL}/default_avatar_girl.png`,
  `${IMG_BASE_URL}/default_avatar_boy2.jpg`,
  `${IMG_BASE_URL}/default_avatar_girl2.jpg`,
  `${IMG_BASE_URL}/default_avatar_boy3.jpg`,
  `${IMG_BASE_URL}/default_avatar_girl3.jpg`,
]

interface Props {
  handleClose: () => void
  handleAvatarSubmit: (AvatarSrc: string) => void
}

export default ({ handleClose, handleAvatarSubmit }: Props) => {
  const handleClick = (src: string) => {
    handleAvatarSubmit(src)
    handleClose()
  }

  const ForumAvatarArr = ForumAvatarsUrl.map((item, index) => (
    <Img key={index} src={item} onClick={() => handleClick(item)} />
  ))

  return (
    <>
      <FlexDiv>{ForumAvatarArr}</FlexDiv>
    </>
  )
}
