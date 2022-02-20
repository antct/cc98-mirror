import { IS_PC } from '@/config'
import { AppBar } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 0 16px;
`

const PCDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
`

// hack for iOS
const AppBarSticky = styled(AppBar)`
  position: sticky;
  position: -webkit-sticky;
` as typeof AppBar

// hack for iOS
const PCAppBarSticky = styled(AppBar)`
  position: sticky;
  position: -webkit-sticky;
  background-color: unset;
  color: unset;
` as typeof AppBar

const StickyBar: React.FC = ({ children }) => {
  return (
    IS_PC ?
      <PCAppBarSticky elevation={0} position="sticky">
        <PCDiv>{children}</PCDiv>
      </PCAppBarSticky>
      :
      <AppBarSticky elevation={0} position="sticky">
        <Div>{children}</Div>
      </AppBarSticky>
  )
}

export default StickyBar