import muiStyled from '@/muiStyled'
import { Fab } from '@mui/material'
import React from 'react'
import { IS_PC, DRAWER_WIDTH, MAX_WIDTH } from '@/config'


// FIX: children: true
const FabS = muiStyled(Fab).attrs({
  size: 'small',
  color: 'primary',
  children: true
})({
  position: 'fixed',
  // bottom: pass by props
  right: IS_PC ? `calc(50% - ${(DRAWER_WIDTH+MAX_WIDTH)/2}px + 4px)` : 15,
  zIndex: 20,
})

interface Props {
  onClick?: () => void
  /** 次序，从 1 计数 */
  order?: number
  children: (boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) & React.ReactNode
}

const FixFab: React.FC<Props> = ({ onClick, order = 1, children }) => (
  <FabS onClick={onClick} style={{ bottom: (order - 1) * 50 + 15 }}>
    {children}
  </FabS>
)

export default FixFab
