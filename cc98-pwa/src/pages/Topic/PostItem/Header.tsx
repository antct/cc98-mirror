import { ANONYMOUS_AVATAR, IS_PC, ONLINE_TIME } from '@/config'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IPost, IUser } from '@cc98/api'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Avatar, Chip, Typography } from '@mui/material'
import Badge from '@mui/material/Badge'
import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import withStyles from '@mui/styles/withStyles'
import dayjs from 'dayjs'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      marginRight: 12,
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
  backgroundColor: "#bdbdbd"
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


const RedHotIcon = <WhatshotIcon color="error" />
const RedLockIcon = <LockIcon color="error" />
const RedFavoriteIcon = <FavoriteIcon color="error" />
const RedLockOpenIcon = <LockOpenIcon color="primary" />

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
            {userInfo && dayjs().diff(dayjs(userInfo.lastLogOnTime), 'minute') <= ONLINE_TIME ?
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
              >
                <AvatarS
                  onClick={() => !postInfo.isAnonymous && !isShare && navigate(`/user/${postInfo.userId}`)}
                  src={(postInfo.isAnonymous || postInfo.isDeleted) ? ANONYMOUS_AVATAR : userInfo && TRANS_IMG(userInfo.portraitUrl, true)}
                  children={false}
                />
              </StyledBadge>
              :
              <AvatarS
                onClick={() => !postInfo.isAnonymous && !isShare && navigate(`/user/${postInfo.userId}`)}
                src={(postInfo.isAnonymous || postInfo.isDeleted) ? ANONYMOUS_AVATAR : userInfo && TRANS_IMG(userInfo.portraitUrl, true)}
                children={false}
              />
            }
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
            {
              postInfo.cacheTime !== undefined ?
                <SubTitle>
                    {`快照 缓存于 ${dayjs(postInfo.cacheTime).format('YYYY/MM/DD HH:mm')}`}
                </SubTitle>
                :
                <SubTitle>
                  {postInfo.lastUpdateTime &&
                    `${postInfo.lastUpdateAuthor || '匿名'} 编辑于 ${dayjs(
                      postInfo.lastUpdateTime
                    ).format('YYYY/MM/DD HH:mm')}`}
                </SubTitle>
            }
          </div>
        </AvatarArea>

        <Floor>
          {
            postInfo.floor === 1 ?
              (isLock ? RedLockIcon : 'LZ') :
              (isHot ? RedHotIcon : (userInfo && userInfo.isFollowing ? RedFavoriteIcon : (postInfo.isLZ ? 'LZ' : `${postInfo.floor}L`)))
          }
        </Floor>
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
            <ChipS size="small" label={`IP ${userInfo.lastIpAddress}`} />
            {userInfo.isFollowing && <ChipS color='secondary' size="small" label={`你的关注`} />}
          </>
        }
      </Div> */}
      {/* <Divider /> */}
    </>
  )
}
