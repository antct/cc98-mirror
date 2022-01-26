import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IPost, IUser } from '@cc98/api'
import { Avatar, Chip, Typography } from '@material-ui/core'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'
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

const ChipS = muiStyled(Chip)({
  marginRight: 5,
  height: 16
})

const Div = styled.div`
  margin: -8px 16px 8px 16px;
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
const LockIcon = <Lock color="error" />
const LockOpenIcon = <LockOpen color="primary" />

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
  /**
   * 是否锁沉
   */
  isLock?: boolean
  /**
   * 是否分享模式
   */
  isShare: boolean
}

export default ({ postInfo, userInfo, isHot, isLock, isShare }: Props) => {
  const { TRANS_IMG } = settingModel
  return (
    <>
      <FlexDiv>
        <AvatarArea>
          <LazyLoad height={'100%'} offset={200} once>
            <AvatarS
              onClick={() => !postInfo.isAnonymous && !isShare && navigate(`/user/${postInfo.userId}`)}
              src={userInfo && TRANS_IMG(userInfo.portraitUrl, true)}
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
                `${postInfo.lastUpdateAuthor || '匿名'} 编辑于 ${dayjs(
                  postInfo.lastUpdateTime
                ).format('YYYY/MM/DD HH:mm')}`}
            </SubTitle>
          </div>
        </AvatarArea>

        <Floor>{postInfo.floor === 1 ? (isLock ? LockIcon : (postInfo.isMe ? 'ME' : 'LZ')) : (isHot ? HotIcon : (postInfo.isMe ? 'ME' : (postInfo.isLZ ? 'LZ' : `${postInfo.floor}L`)))}</Floor>
      </FlexDiv>
      {/* <Div>
        {
          userInfo && <>
            <ChipS size="small" label={userInfo.gender === 1 ? '男' : '女'} />
            <ChipS size="small" label={`帖 ${userInfo.postCount}`} />
            <ChipS size="small" label={`赞 ${userInfo.receivedLikeCount}`} />
            <ChipS size="small" label={`粉丝 ${userInfo.fanCount}`} />
            <ChipS size="small" label={`风评 ${userInfo.popularity}`} />
            <ChipS size="small" label={`威望 ${userInfo.prestige}`} />
            {userInfo.isFollowing && <ChipS color='secondary' size="small" label={`你的关注`} />}
          </>
        }
      </Div> */}
      {/* <Divider /> */}
    </>
  )
}
