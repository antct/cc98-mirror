import { IconButton, SnackbarContent } from '@material-ui/core'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
// import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import React from 'react'
import styled from 'styled-components'


const IconMap = {
  info: InfoIcon,
  success: CheckCircleIcon,
  error: ErrorIcon,
}

const ColorMap = {
  info: undefined,
  success: green[400],
  error: red[400],
}

interface Props {
  variant: 'info' | 'success' | 'error'
  message: string
  onClose: () => void
}

const MessageDiv = styled.div`
  display: flex;
  align-items: center;
`

const Message = styled.div`
  margin-left: 1rem;
`

const MySnackbarContent: React.ForwardRefRenderFunction<unknown, Props> = ({ variant, message, onClose }, ref) => {
  const Icon = IconMap[variant]

  return (
    <SnackbarContent
      ref={ref}
      style={{
        backgroundColor: ColorMap[variant],
      }}
      message={
        <MessageDiv>
          <Icon fontSize="small" />
          <Message>{message}</Message>
        </MessageDiv>
      }
      action={
        <IconButton color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default React.forwardRef(MySnackbarContent)
