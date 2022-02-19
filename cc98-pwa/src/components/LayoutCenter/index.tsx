// import React from 'react'
import { MAX_WIDTH, BIG_MAX_WIDTH, PC_WIDTH } from '@/config'
import { styled } from '@mui/material/styles'

interface DivProps {
  open?: boolean;
}

const PCLayoutCenter = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<DivProps>(({ theme, open }) => ({
  position: "absolute",
  left: 'auto',
  right: 'auto',
  bottom: 0,
  width: BIG_MAX_WIDTH,
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: MAX_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export { PCLayoutCenter }

const LayoutCenter = styled('div')(({ theme }) => ({
  position: "absolute",
  width: '100%',
  maxWidth: PC_WIDTH,
  left: 'auto',
  right: 'auto',
  bottom: 0,
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export default LayoutCenter
