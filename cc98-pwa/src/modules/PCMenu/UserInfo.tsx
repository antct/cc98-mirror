import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IUser } from '@cc98/api'
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from "react-oidc-context"
import styled from 'styled-components'

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AvatarS = muiStyled(Avatar)({
  width: 28,
  height: 28,
})

const IconButtonS = muiStyled(IconButton).attrs({
})({
  marginRight: -8,
})

interface Props {
  isLogIn: boolean
  info: IUser | null
}

const UserInfo: React.FC<Props> = ({ isLogIn, info }) => {
  const auth = useAuth()
  const { LOG_OUT } = userModel
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  return (<WrapperDiv>
    {isLogIn && (
      <>
        <IconButtonS onClick={handleOpenUserMenu}>
          <AvatarS src={info ? info.portraitUrl : undefined} children={false} />
        </IconButtonS>
        <Menu
          sx={{ mt: '28px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => {
            handleCloseUserMenu()
            navigate('/userCenter')
          }}>
            <Typography textAlign="center">{'资料'}</Typography>
          </MenuItem>
          <MenuItem onClick={() => {
            handleCloseUserMenu()
            if (auth.isAuthenticated) auth.removeUser().then(() => LOG_OUT())
            else LOG_OUT()
          }}>
            <Typography textAlign="center" >{'退出'}</Typography>
          </MenuItem>
        </Menu>
      </>
    )}
    {!isLogIn && (
      <>
        <IconButtonS onClick={handleOpenUserMenu}>
          <AvatarS />
        </IconButtonS>
        <Menu
          sx={{ mt: '28px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => {
            handleCloseUserMenu()
            navigate('/logIn')
          }}>
            <Typography textAlign="center">{'登录'}</Typography>
          </MenuItem>
        </Menu>
      </>
    )}
  </WrapperDiv>)
}

export default UserInfo
