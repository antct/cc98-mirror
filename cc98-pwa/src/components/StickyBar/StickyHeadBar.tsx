import muiStyled from '@/muiStyled'
import { goback } from '@/utils/history'
import { AppBar, Divider, IconButton, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import React from 'react'
import styled from 'styled-components'
import StickyBar from './index'
import { IS_PC } from '@/config'


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

const PCTitle = muiStyled(Typography).attrs({
  variant: 'body1',
  color: 'inherit',
})({
  margin: '6px 0px',
  flexGrow: 2,
  flexShrink: 1,
  fontWeight: 'bold'
})

const AcitonDiv = styled.div`
  margin-left: -10px;
  margin-right: -16px;
  width: 48px;
  height: 48px;
  text-align: center;
`

const PCAcitonDiv = styled.div`
  margin-left: -10px;
  margin-right: -16px;
  width: 48px;
  height: 44px;
  text-align: center;
`

const SubTitle = muiStyled(Typography).attrs({
  variant: 'body2',
  color: 'inherit',
})({
  // minWidth: '4rem',
  // maxWidth: '6rem',
  textAlign: 'center',
  flexShrink: 1,
  opacity: 0.75,
})

const PCSubTitle = muiStyled(Typography).attrs({
  variant: 'body1',
  color: 'inherit',
})({
  // minWidth: '4rem',
  // maxWidth: '6rem',
  textAlign: 'center',
  flexShrink: 1,
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
    IS_PC ?
      <>
        <StickyBar>
          {
            !!!isShare &&
            <GobackIcon onClick={goback}>
              <KeyboardBackspaceIcon />
            </GobackIcon>
          }
          <PCTitle onClick={titleClick}>{title}</PCTitle>
          <PCSubTitle onClick={subTitleClick}>{subTitle}</PCSubTitle>
          {action && <PCAcitonDiv>{action}</PCAcitonDiv>}
        </StickyBar>
        <Divider />
      </>
      :
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
