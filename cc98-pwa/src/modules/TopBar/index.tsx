import { IS_PC, MAX_WIDTH } from '@/config'
import stateModel from '@/models/state'
import muiStyled from '@/muiStyled'
import version from '@/version'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'


const AppBarS = muiStyled(AppBar)({
  '@media screen and (max-width: 600px)': {
    maxWidth: `${MAX_WIDTH}px`,
    left: 'auto',
    right: 'auto',
  },
  '@media screen and (min-width: 600px)': {
    maxWidth: 'calc(100% - 180px)',
    left: 180,
    right: 'auto',
  }
})

const ToolbarS = muiStyled(Toolbar)({
  '@media (min-width: 600px)': {
    minHeight: 56,
  },
})

const IconButtonS = muiStyled(IconButton).attrs({
  color: 'inherit',
})({
  marginLeft: -20,
  marginRight: 0,
})

const MainText = muiStyled(Typography).attrs({
  color: 'inherit',
})({
  flexGrow: 1,
})

const Version = muiStyled(Button).attrs({
  color: 'inherit',
  size: 'small',
})({
  marginRight: -8,
  paddingRight: 0,
})

const TopBar: React.FC = () => (
  <AppBarS elevation={0}>
    <ToolbarS>
      { !IS_PC && 
      <IconButtonS onClick={stateModel.OPEN_DRAWER}>
        <MenuIcon />
      </IconButtonS>
      }

      <MainText>CC98 ©TT</MainText>
      <Version>{version}</Version>
    </ToolbarS>
  </AppBarS>
)

export default TopBar
