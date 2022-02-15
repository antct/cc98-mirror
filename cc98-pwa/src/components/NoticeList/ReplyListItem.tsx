import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IReply, ITopic } from '@cc98/api'
import { ListItemButton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'


const ListItemButtonS = muiStyled(ListItemButton)({
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
  <ListItemButtonS divider onClick={onClick}>
    <TitleArea>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TitleArea>

    <InfoArea>
      <Info1>{info1}</Info1>
      <Info2>{info2}</Info2>
    </InfoArea>
  </ListItemButtonS>
)


interface Props {
  data: IReply
  topic: ITopic
}

export default ({ data, topic }: Props) => {
  const post = data.postBasicInfo

  if (!!!post || !!!topic) return null

  const { userName, floor, isDeleted } = post
  const { title } = topic

  if (isDeleted) return null

  const subtitle = userName || '[匿名]'

  const info1 = data.isRead ? '已读' : '未读'
  const info2 = dayjs(data.time).fromNow()

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