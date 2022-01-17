import { AVATAR_COMPRESS_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IPost, IUser } from '@cc98/api'
import { Avatar, Typography } from '@material-ui/core'
import Whatshot from '@material-ui/icons/Whatshot'
import dayjs from 'dayjs'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'


const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 16px;
  margin-right: 0px;
`

const AvatarArea = styled.div`
  display: flex;
  align-items: center;
`

const AvatarS = muiStyled(Avatar)({
  marginRight: 12,
})

const Title = Typography

const SubTitle = muiStyled(Typography).attrs({
  color: 'textSecondary',
})({})

const Floor = muiStyled(Typography).attrs({
  variant: 'button',
  color: 'textSecondary',
  align: 'center'
})({
  width: 48,
  height: 48
})

// const HotIcon = muiStyled(Whatshot)({
//   color: red[400],
// })

const HotIcon = <Whatshot color="error" />

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo: IUser | undefined
  /**
   * 是否热帖
   */
  isHot?: boolean
  isShare: boolean
}

export default ({ postInfo, userInfo, isHot, isShare }: Props) => {
  const { useCompress } = useModel(settingModel, ['useCompress'])
  return (
    <FlexDiv>
      <AvatarArea>
        <LazyLoad height={'100%'} offset={200} once>
          <AvatarS
            onClick={() => !postInfo.isAnonymous && !isShare && navigate(`/user/${postInfo.userId}`)}
            src={userInfo && `${userInfo.portraitUrl}?compress=${useCompress}&width=${AVATAR_COMPRESS_WIDTH}`}
          >
            {(postInfo.isAnonymous || postInfo.isDeleted) && '匿'}
          </AvatarS>
        </LazyLoad>
        <div>
          {/* {isHot && <a href={`#${postInfo.floor}`} />} */}
          <Title>
            {postInfo.isDeleted
              ? '98Deleter'
              : postInfo.isAnonymous
                ? `匿名${postInfo.userName.toUpperCase()}`
                : postInfo.userName}
          </Title>
          <SubTitle>{dayjs(postInfo.time).format('YYYY/MM/DD HH:mm')}</SubTitle>
          <SubTitle>
            {postInfo.lastUpdateTime &&
              `由 ${postInfo.lastUpdateAuthor || '匿名'} 编辑于 ${dayjs(
                postInfo.lastUpdateTime
              ).format('YYYY/MM/DD HH:mm')}`}
          </SubTitle>
        </div>
      </AvatarArea>

      <Floor>{isHot ? HotIcon : (postInfo.isLZ ? 'LZ' : `${postInfo.floor}L`)}</Floor>
    </FlexDiv>
  )
}
