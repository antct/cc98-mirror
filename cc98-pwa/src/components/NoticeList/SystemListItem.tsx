import muiStyled from '@/muiStyled'
import { ISystem } from '@cc98/api'
import { ListItem, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'


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
}

export const SystemItem: React.FC<ItemProps> = ({ title, subtitle, info1, info2 }) => (
  <ListItemS button divider>
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
  data: ISystem
}

export default ({ data }: Props) => {
  const title = data.title
  let subtitle = data.content
  let info1 = dayjs(data.time).fromNow()
  let info2 = data.isRead ? '已读' : '未读'

  return (
    <SystemItem
      title={title}
      subtitle={subtitle}
      info1={info1}
      info2={info2}
    />
  )
}
