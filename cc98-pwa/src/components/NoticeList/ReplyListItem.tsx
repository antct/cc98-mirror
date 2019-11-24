import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'

import { ListItem, Typography } from '@material-ui/core'

import { IReply, IPost, ITopic } from '@cc98/api'

import useFetcher from '@/hooks/useFetcher'
import { getPostInfoById } from '@/services/post'
import { getTopicInfoById } from '@/services/topic'

import { getBoardNameById } from '@/services/board'

import dayjs from 'dayjs'

const ListItemS = muiStyled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '100%',
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
  onClick: () => void
}

export const ReplyItem: React.FC<ItemProps> = ({ onClick, title, subtitle, info1, info2 }) => (
  <ListItemS button divider onClick={onClick}>
    <TitleArea>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TitleArea>

    <InfoArea>
      <Info1>{info1}</Info1>
      <Info2>{info2}</Info2>
    </InfoArea>
  </ListItemS>
)


interface Props {
  data: IReply
  post: IPost
  topic: ITopic
}

export default ({ data, post, topic }: Props) => {
  // const [postInfo, setPostInfo] = useFetcher(() => getPostInfoById(data.postId))
  // const [topicInfo, setTopicInfo] = useFetcher(() => getTopicInfoById(data.topicId))
  if (post === null || post === undefined) {
    return null
  }
  if (topic === null || topic === undefined) {
    return null
  }
  const { userName, floor, isDeleted } = post
  const { title } = topic

  if (isDeleted) {
    return null
  }

  let subtitle = userName || '[匿名]'

  let info1 = dayjs(data.time).fromNow()
  let info2 = data.isRead ? '已读' : '未读'

  // let page = Math.floor(floor / 10) + 1
  // let offset = floor % 10

  return (
    <ReplyItem
      onClick={() => navigate(`/topic/${data.topicId}/${floor}`)}
      title={title}
      subtitle={subtitle}
      info1={info1}
      info2={info2}
    />
  )
}