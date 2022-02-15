import LayoutCenter from '@/components/LayoutCenter'
import muiStyled from '@/muiStyled'
import { Button, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import ErrorImage from './ErrorImage'


const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ButtonS = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 20,
})

interface Props {
  /**
   * 错误提示
   */
  errMessage: string
  /**
   * 补充提示
   */
  secondMessage?: string
  button?: boolean
}

export default ({ errMessage, secondMessage, button = true }: Props) => (
  <LayoutCenter>
    <FlexDiv>
      <ErrorImage status="404" />
      <Typography variant="h6" color="textPrimary">
        {errMessage}
      </Typography>
      {secondMessage && (
        <Typography variant="subtitle1" color="textPrimary">
          {secondMessage}
        </Typography>
      )}
      {button && window.history.length > 1 && (
        <ButtonS onClick={() => window.history.back()}>
          回到前页
        </ButtonS>
      )}
    </FlexDiv>
  </LayoutCenter>
)
