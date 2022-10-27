import settingModel from '@/models/setting'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IUser } from '@cc98/api'
import RegistrationIcon from '@mui/icons-material/AppRegistration'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
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
  const { TRANS_IMG } = settingModel
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
          <AvatarS src={info ? TRANS_IMG(info.portraitUrl, true) : undefined} children={false} imgProps={{ referrerPolicy: "no-referrer" }} />
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
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            用户
          </MenuItem>
          <MenuItem onClick={() => {
            handleCloseUserMenu()
            if (auth.isAuthenticated) auth.removeUser().then(() => LOG_OUT())
            else LOG_OUT()
          }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            登出
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
            window.open('https://account.cc98.org/')
          }}>
            <ListItemIcon>
              <RegistrationIcon fontSize="small" />
            </ListItemIcon>
            注册
          </MenuItem>
          <MenuItem onClick={() => {
            handleCloseUserMenu()
            navigate('/logIn')
          }}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            登录
          </MenuItem>
        </Menu>
      </>
    )}
  </WrapperDiv>)
}

export default UserInfo
