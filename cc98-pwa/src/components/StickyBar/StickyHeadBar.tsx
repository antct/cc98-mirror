import muiStyled from '@/muiStyled'
import { goback } from '@/utils/history'
import { IconButton, Typography } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import React from 'react'
import styled from 'styled-components'
import StickyBar from './index'


const GobackIcon = muiStyled(IconButton).attrs({
  color: 'inherit',
})({
  marginLeft: -12,
  marginRight: -4,
})

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle2',
  color: 'inherit',
})({
  margin: '6px 4px',
  flexGrow: 2,
  flexShrink: 1,
  lineHeight: 1.25,
})

const AcitonDiv = styled.div`
  margin-left: -10px;
  margin-right: -16px;
`

const SubTitle = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'inherit',
})({
  minWidth: '4rem',
  maxWidth: '6rem',
  textAlign: 'center',
  flexShrink: 2,
  opacity: 0.75,
})

interface Props {
  title: string
  titleClick?: () => void
  subTitle: string
  subTitleClick?: () => void
  action?: React.ReactNode
  isShare?: boolean
}

const StickyHeadBar: React.FC<Props> = ({ title, titleClick, subTitle, subTitleClick, action, isShare }) => {
  return (
    <StickyBar>
      {
        !!!isShare &&
        <GobackIcon onClick={goback}>
          <KeyboardBackspaceIcon />
        </GobackIcon>
      }
      <Title onClick={titleClick}>{title}</Title>
      <SubTitle onClick={subTitleClick}>{subTitle}</SubTitle>
      {action && <AcitonDiv>{action}</AcitonDiv>}
    </StickyBar>
  )
}

export default StickyHeadBar
