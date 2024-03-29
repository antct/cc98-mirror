import LayoutCenter, { PCLayoutCenter } from '@/components/LayoutCenter'
import muiStyled from '@/muiStyled'
import { Button, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import ErrorImage from './ErrorImage'
import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'
import { IS_PC } from '@/config'


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
  buttonMessage?: string
}

export default ({ errMessage, secondMessage, button = false, buttonMessage = ""}: Props) => {
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  return (
    IS_PC ?
      <PCLayoutCenter open={isDrawerOpen}>
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
              {buttonMessage}
            </ButtonS>
          )}
        </FlexDiv>
      </PCLayoutCenter>
      :
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
              {buttonMessage}
            </ButtonS>
          )}
        </FlexDiv>
      </LayoutCenter>
  )
}