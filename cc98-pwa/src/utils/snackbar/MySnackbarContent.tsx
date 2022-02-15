import { IconButton, SnackbarContent } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// import WarningIcon from '@mui/icons-material/Warning'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import React from 'react'
import styled from 'styled-components'


import { green, red } from '@mui/material/colors';


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
        <IconButton color="inherit" onClick={onClose} size="large">
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

export default React.forwardRef(MySnackbarContent)
