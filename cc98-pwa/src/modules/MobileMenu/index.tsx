import { DRAWER_WIDTH, PC_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import stateModel from '@/models/state'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import version from '@/version'
import CancelIcon from '@mui/icons-material/Cancel'
import BoardIcon from '@mui/icons-material/Dashboard'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import GroupIcon from '@mui/icons-material/Group'
import HelpIcon from '@mui/icons-material/Help'
import HomeIcon from '@mui/icons-material/Home'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PageviewIcon from '@mui/icons-material/Pageview'
import PetsIcon from '@mui/icons-material/Pets'
import CollectionsIcon from '@mui/icons-material/Photo'
import SettingsIcon from '@mui/icons-material/Settings'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { AppBar, Badge, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from "react-oidc-context"
import UserInfo from './UserInfo'

const AppBarS = muiStyled(AppBar)({
  maxWidth: PC_WIDTH,
  left: 'auto',
  right: 'auto',
})

const ToolbarS = muiStyled(Toolbar)({
  '@media (min-width: 600px)': {
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 56,
  }
})

const IconButtonS = muiStyled(IconButton).attrs({
  color: 'inherit',
})({
  marginLeft: -12,
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
  minWidth: 40,
  marginRight: 0,
  paddingRight: 0,
})


interface ItemProps {
  /**
   * 图标
   */
  icon: React.ReactElement<any>
  /**
   * 文字
   */
  text: string
  /**
   * 单击回调
   */
  onClick: () => void
}

const Item: React.FC<ItemProps> = ({ icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const ListS = muiStyled(List)({
  width: DRAWER_WIDTH,
})

const DividerS = muiStyled(Divider)({
  margin: '0 16px',
  height: 1.5,
})

const jump = (link: string) => () => navigate(link)

const MobileMenu: React.FC = ({ children }) => {
  const user = useModel(userModel)
  const auth = useAuth()
  const { LOG_OUT } = userModel
  const { CLOSE_DRAWER } = stateModel
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  const { useNotification } = useModel(settingModel, ['useNotification'])
  return (
    <>
      <AppBarS elevation={0}>
        <ToolbarS>
          <IconButtonS onClick={stateModel.OPEN_DRAWER}>
            <MenuIcon />
          </IconButtonS>
          <MainText>CC98</MainText>
          <Version>{version}</Version>
        </ToolbarS>
      </AppBarS>
      <Drawer open={isDrawerOpen} onClose={CLOSE_DRAWER}>
        <ListS onClick={CLOSE_DRAWER}>
          <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
          <DividerS />

          {user.isLogIn && (
            <>
              <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
              {/* <Item icon={<IndexIcon />} text="首页" onClick={jump('/index')} /> */}
              <Item icon={<TrendingUpIcon />} text="热门" onClick={jump('/hotTopics')} />
              <Item icon={<FiberNewIcon />} text="新帖" onClick={jump('/newTopics')} />
              <Item icon={<BoardIcon />} text="版面" onClick={jump('/boardList')} />
              <Item icon={<CollectionsIcon />} text="关注" onClick={jump('/myFollow')} />
              <Item icon={<Badge max={99} badgeContent={(useNotification && user.unRead) ? (user.unRead.atCount + user.unRead.replyCount + user.unRead.systemCount) : 0} color="primary"><NotificationsIcon /></Badge>} text="通知" onClick={jump('/notice')} />
              <Item icon={<Badge max={99} badgeContent={(useNotification && user.unRead) ? (user.unRead.messageCount) : 0} color="primary"><MailIcon /></Badge>} text="私信" onClick={jump('/messageList')} />
              <Item icon={<Badge max={99} badgeContent={user.fanDiff} color="primary"><GroupIcon /></Badge>} text="好友" onClick={jump('/friend')} />
              <Item icon={<PetsIcon />} text="足迹" onClick={jump('/history')} />
              <Item icon={<PageviewIcon />} text="搜索" onClick={jump('/search')} />
              <Item icon={<SettingsIcon />} text="设置" onClick={jump('/setting')} />
              <Item icon={<HelpIcon />} text="帮助" onClick={jump('/help')} />
            </>
          )}
          {!user.isLogIn && (
            <>
              <Item icon={<HelpIcon />} text="联系" onClick={() => window.open('https://github.com/ttcqaq')} />
            </>
          )}
          {user.isLogIn && (
            <>
              <Item icon={<CancelIcon />} text="退出" onClick={() => {
                if (auth.isAuthenticated) auth.removeUser().then(() => LOG_OUT())
                else LOG_OUT()
              }} />
            </>
          )}
        </ListS>
      </Drawer>
      {children}
    </>
  )
}

export default MobileMenu
