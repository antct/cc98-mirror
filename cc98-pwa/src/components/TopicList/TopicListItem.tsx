import { ANONYMOUS_AVATAR, IS_PC } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getBoardNameById } from '@/services/board'
import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'
import PersonIcon from '@mui/icons-material/Person'
import ReplyIcon from '@mui/icons-material/Reply'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Avatar, ListItemButton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

const ListItemButtonS = muiStyled(ListItemButton)({
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
  backgroundColor: "#bdbdbd"
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
  dislikeCount?: number
  isHighlight?: boolean
  portraitUrl?: string
  showAvatar: boolean
  onClick: () => void
}

export const TopicItem: React.FC<ItemProps> = ({ onClick, isHighlight = false, portraitUrl, showAvatar, title, subtitle, info1, info2, hitCount = undefined, lastPostUser = undefined, replyCount = undefined, likeCount = undefined, dislikeCount = undefined }) => (
  <ListItemButtonS divider onClick={onClick} >
    {showAvatar &&
      <AvatarArea>
        <LazyLoad
          height={'100%'}
          offset={200}
          once
          placeholder={<AvatarS src={undefined} children={false} imgProps={{ referrerPolicy: "no-referrer" }} />}
        >
          <AvatarS src={portraitUrl} children={false} imgProps={{ referrerPolicy: "no-referrer" }} />
        </LazyLoad>
      </AvatarArea>
    }
    <TitleArea>
      <Title color={isHighlight ? 'secondary' : 'textPrimary'}>{title}</Title>
      <SubTitle>
        {subtitle}
        {subtitle.length > 0 &&
          (<>
            &nbsp;&nbsp;
          </>)
        }
        {replyCount !== undefined &&
          (<>
            <ReplyIconS />
            &nbsp;
            {replyCount}
            &nbsp;&nbsp;
          </>)
        }
        {hitCount !== undefined &&
          (<>
            <VisibilityIconS />
            &nbsp;
            {hitCount}
            &nbsp;&nbsp;
          </>)
        }
        {IS_PC && lastPostUser !== undefined &&
          (<>
            <PersonIconS />
            &nbsp;
            {lastPostUser}
            &nbsp;&nbsp;
          </>)
        }
        {likeCount !== undefined &&
          (<>
            <ThumbUpIconS />
            &nbsp;
            {likeCount}
            &nbsp;&nbsp;
          </>)
        }
        {dislikeCount !== undefined &&
          (<>
            <ThumbDownIconS />
            &nbsp;
            {dislikeCount}
            &nbsp;&nbsp;
          </>)
        }
      </SubTitle>
    </TitleArea>

    <InfoArea>
      <Info1>{info1}</Info1>
      <Info2>{info2}</Info2>
    </InfoArea>
  </ListItemButtonS>
)

export type Place = 'inboard' | 'newtopic' | 'usercenter' | 'follow' | 'search' | 'hot' | 'follow-update' | 'search-content' | 'randomtopic'

interface Props {
  data: ITopic
  place: Place
  portraitUrl: string
}

export default ({ data, place, portraitUrl }: Props) => {
  const [boardName, setBoardName] = useState('')
  const { customWords } = useModel(settingModel, ['customWords'])
  const { TRANS_IMG } = settingModel
  useEffect(() => {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [place])

  const title = data.title
  let subtitle = data.userName || '[匿名]'
  // 随机推荐
  if (data.content) subtitle = data.content;
  let info1 = boardName
  let info2 = dayjs(data.lastPostTime).fromNow()
  let hitCount: number | undefined = data.hitCount
  let lastPostUser: string | undefined = data.lastPostUser
  let replyCount: number | undefined = data.replyCount
  let likeCount: number | undefined = data.likeCount
  let dislikeCount: number | undefined = data.dislikeCount
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
      subtitle = ''
      showAvatar = false
      lastPostUser = undefined
      likeCount = undefined
      dislikeCount = undefined
      break
    case 'hot':
      lastPostUser = undefined
      likeCount = undefined
      dislikeCount = undefined
      break
    case 'newtopic':
      showAvatar = true
      likeCount = undefined
      dislikeCount = undefined
      break
    case 'follow-update':
      hitCount = undefined
      replyCount = undefined
      lastPostUser = undefined
      likeCount = undefined
      dislikeCount = undefined
      break
    case 'follow':
    case 'search':
      // 搜索时使用发帖时间
      // https://github.com/ZJU-CC98/CC98-PWA/issues/35
      hitCount = undefined
      replyCount = undefined
      lastPostUser = undefined
      likeCount = undefined
      dislikeCount = undefined
      break
    case 'search-content':
      hitCount = undefined
      replyCount = undefined
      lastPostUser = undefined
      likeCount = undefined
      dislikeCount = undefined
      break
    case 'inboard':
      likeCount = undefined
      dislikeCount = undefined
      break
    case 'randomtopic':
      hitCount = undefined
      replyCount = undefined
      lastPostUser = undefined
      likeCount = undefined
      dislikeCount = undefined
      break
  }

  return (
    <TopicItem
      onClick={() => navigate(`/topic/${data.id}`)}
      isHighlight={showHighlight}
      portraitUrl={data.isAnonymous ? TRANS_IMG(ANONYMOUS_AVATAR, true) : TRANS_IMG(portraitUrl, true)}
      showAvatar={showAvatar}
      title={title}
      subtitle={subtitle}
      info1={info1}
      info2={info2}
      hitCount={hitCount}
      replyCount={replyCount}
      likeCount={likeCount}
      dislikeCount={dislikeCount}
      lastPostUser={lastPostUser}
    />
  )
}
