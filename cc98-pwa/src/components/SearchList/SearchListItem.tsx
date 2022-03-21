import { ANONYMOUS_AVATAR } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getBoardNameById } from '@/services/board'
import { navigate } from '@/utils/history'
import { IPost } from '@cc98/api'
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
  wordBreak: 'break-all'
})

const SubTitle = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({
  marginTop: 4,
  wordBreak: 'break-all'
})

const Info1 = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'textSecondary',
})({})

const Info2 = Info1

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
  portraitUrl?: string
  onClick: () => void
}

export const SearchItem: React.FC<ItemProps> = ({ onClick, portraitUrl, title, subtitle, info1, info2 }) => (
  <ListItemButtonS divider onClick={onClick} >
    <AvatarArea>
      <LazyLoad height={'100%'} offset={200} once>
        <AvatarS src={portraitUrl} children={false} />
      </LazyLoad>
    </AvatarArea>
    <TitleArea>
      <Title><span dangerouslySetInnerHTML={{ __html: title }}></span></Title>
      <SubTitle><span dangerouslySetInnerHTML={{ __html: subtitle }}></span></SubTitle>
    </TitleArea>

    <InfoArea>
      <Info1>{info1}</Info1>
      <Info2>{info2}</Info2>
    </InfoArea>
  </ListItemButtonS>
)

export type Place = 'search'

interface Props {
  data: IPost
  place: Place
  portraitUrl: string
}

export default ({ data, place, portraitUrl }: Props) => {
  const [boardName, setBoardName] = useState('')
  const { TRANS_IMG } = settingModel
  useEffect(() => {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [place])

  let title = data.highlightInfo?.title ? data.highlightInfo.title[0] : data.title
  let subtitle = data.highlightInfo?.content ? data.highlightInfo.content[0] : ''
  let info1 = boardName
  let info2 = dayjs(data.time).fromNow()

  switch (place) {
    case 'search':
      break
  }

  return (
    <SearchItem
      onClick={() => navigate(`/topic/${data.topicId}#${data.floor}`)}
      portraitUrl={data.isAnonymous ? TRANS_IMG(ANONYMOUS_AVATAR, true) : TRANS_IMG(portraitUrl, true)}
      title={title}
      subtitle={subtitle}
      info1={info1}
      info2={info2}
    />
  )
}
