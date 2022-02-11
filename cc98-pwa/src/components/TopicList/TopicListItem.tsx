import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getBoardNameById } from '@/services/board'
import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'
import { Avatar, ListItem, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import ReplyIcon from '@material-ui/icons/Reply'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import VisibilityIcon from '@material-ui/icons/Visibility'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

const ListItemS = muiStyled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '100%',
})

const AvatarArea = styled.div`
  display: flex;
  align-items: center;
`

const AvatarS = muiStyled(Avatar)({
  marginRight: 12,
})

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle2',
  color: 'textPrimary',
})({
  // marginTop: 3,
  // lineHeight: 1.25,
  flexGrow: 1,
})

const SubTitle = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({
  marginTop: 4,
})

const Info1 = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({})

const Info2 = Info1


const VisibilityIconS = muiStyled(VisibilityIcon).attrs({
})({
  fontSize: "medium",
  verticalAlign: 'text-top'
})

const ReplyIconS = muiStyled(ReplyIcon).attrs({
})({
  fontSize: "medium",
  verticalAlign: 'text-top'
})

const PersonIconS = muiStyled(PersonIcon).attrs({
})({
  fontSize: "medium",
  verticalAlign: 'text-top'
})

const ThumbUpIconS = muiStyled(ThumbUpIcon).attrs({
})({
  fontSize: "medium",
  verticalAlign: 'text-top'
})

const ThumbDownIconS = muiStyled(ThumbDownIcon).attrs({
})({
  fontSize: "medium",
  verticalAlign: 'text-top'
})
/**
 * 布局：
 * title           info1
 * subtitle        info2
 */
interface ItemProps {
  title: string
  subtitle: string
  info1: string
  info2: string
  hitCount?: number
  lastPostUser?: string
  replyCount?: number
  likeCount?: number
  disLikeCount?: number
  isAnonymous: boolean
  isHighlight?: boolean
  portraitUrl?: string
  showAvatar: boolean
  onClick: () => void
}

export const TopicItem: React.FC<ItemProps> = ({ onClick, isAnonymous, isHighlight = false, portraitUrl, showAvatar, title, subtitle, info1, info2, hitCount = undefined, lastPostUser = undefined, replyCount = undefined, likeCount = undefined, disLikeCount = undefined }) => (
  <ListItemS button divider onClick={onClick}>
    {showAvatar &&
      <AvatarArea>
        <LazyLoad height={'100%'} offset={200} once>
          <AvatarS src={portraitUrl}>
            {isAnonymous && '匿'}
          </AvatarS>
        </LazyLoad>
      </AvatarArea>
    }
    <TitleArea>
      <Title color={isHighlight ? 'secondary' : 'textPrimary'}>{title}</Title>
      <SubTitle>
        {subtitle}
        {hitCount !== undefined &&
          (<>
            &nbsp;&nbsp;
            <VisibilityIconS />
            &nbsp;
            {hitCount}
          </>)
        }
        {replyCount !== undefined &&
          (<>
            &nbsp;&nbsp;
            <ReplyIconS />
            &nbsp;
            {replyCount}
          </>)
        }
        {lastPostUser !== undefined &&
          (<>
            &nbsp;&nbsp;
            <PersonIconS />
            &nbsp;
            {lastPostUser}
          </>)
        }
        {likeCount !== undefined &&
          (<>
            &nbsp;&nbsp;
            <ThumbUpIconS />
            &nbsp;
            {likeCount}
          </>)
        }
        {disLikeCount !== undefined &&
          (<>
            &nbsp;&nbsp;
            <ThumbDownIconS />
            &nbsp;
            {disLikeCount}
          </>)
        }
      </SubTitle>
    </TitleArea>

    <InfoArea>
      <Info1>{info1}</Info1>
      <Info2>{info2}</Info2>
    </InfoArea>
  </ListItemS>
)

export type Place = 'inboard' | 'newtopic' | 'usercenter' | 'follow' | 'search' | 'hot' | 'follow-update'

interface Props {
  data: ITopic
  place: Place
  portraitUrl: string
}

export default ({ data, place, portraitUrl }: Props) => {
  const [boardName, setBoardName] = useState('')
  const { useAvatar, customWords } = useModel(settingModel, ['useAvatar', 'customWords'])
  const { TRANS_IMG } = settingModel
  useEffect(() => {
    if (place === 'inboard') {
      return
    }
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [place])

  const title = data.title
  let subtitle = data.userName || '[匿名]'
  let info1 = dayjs(data.lastPostTime).fromNow()
  let info2 = `回帖: ${data.replyCount}`
  let hitCount: number | undefined = data.hitCount
  let lastPostUser: string | undefined = data.lastPostUser
  let replyCount: number | undefined = data.replyCount
  let showAvatar = true
  let showHighlight = false

  for (let i in customWords) {
    const word = customWords[i]
    if (title.indexOf(word) >= 0) {
      showHighlight = true
      break
    }
  }

  switch (place) {
    case 'usercenter':
      subtitle = boardName
      showAvatar = false
      hitCount = undefined
      replyCount = undefined
      lastPostUser = undefined
      break
    case 'hot':
      info1 = boardName
      lastPostUser = undefined
      break
    case 'newtopic':
      info1 = dayjs(data.time).fromNow()
      info2 = boardName
      showAvatar = true
      break
    case 'follow-update':
      info1 = dayjs(data.lastPostTime).fromNow()
      info2 = boardName
      hitCount = undefined
      replyCount = undefined
      lastPostUser = undefined
      break
    case 'follow':
    case 'search':
      // 搜索时使用发帖时间
      // https://github.com/ZJU-CC98/CC98-PWA/issues/35
      info1 = dayjs(data.time).fromNow()
      info2 = boardName
      hitCount = undefined
      replyCount = undefined
      lastPostUser = undefined
      break
    case 'inboard':
      break
  }

  return (
    <TopicItem
      onClick={() => navigate(`/topic/${data.id}`)}
      isAnonymous={data.isAnonymous}
      isHighlight={showHighlight}
      portraitUrl={TRANS_IMG(portraitUrl, true)}
      showAvatar={useAvatar && showAvatar}
      title={title}
      subtitle={subtitle}
      info1={info1}
      info2={info2}
      hitCount={hitCount}
      replyCount={replyCount}
      lastPostUser={lastPostUser}
    />
  )
}
