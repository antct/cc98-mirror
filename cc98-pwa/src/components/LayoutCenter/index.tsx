// import React from 'react'
import { DRAWER_WIDTH, IS_PC, MAX_WIDTH } from '@/config'
import styled from 'styled-components'

const LayoutCenter = styled.div`
  position: absolute;
  width: 100%;
  max-width: ${IS_PC ? MAX_WIDTH+DRAWER_WIDTH-56 : MAX_WIDTH}px;
  top: 0;
  left: auto;
  right: auto;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default LayoutCenter
