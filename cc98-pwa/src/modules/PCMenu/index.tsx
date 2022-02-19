import { DRAWER_WIDTH, MAX_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import ListS from '@/hotfix/List'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import stateModel from '@/models/state'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import CancelIcon from '@mui/icons-material/Cancel'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BoardIcon from '@mui/icons-material/Dashboard'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import GroupIcon from '@mui/icons-material/Group'
import HelpIcon from '@mui/icons-material/Help'
import HomeIcon from '@mui/icons-material/Home'
import IndexIcon from '@mui/icons-material/List'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PageviewIcon from '@mui/icons-material/Pageview'
import PetsIcon from '@mui/icons-material/Pets'
import CollectionsIcon from '@mui/icons-material/Photo'
import SettingsIcon from '@mui/icons-material/Settings'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Badge, Divider, IconButton, ListItem, ListItemIcon, Toolbar, Tooltip, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles'
import React from 'react'
import { useAuth } from "react-oidc-context"
import UserInfo from './UserInfo'


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
  marginLeft: -8,
  marginRight: 8,
})

const MainText = muiStyled(Typography).attrs({
  color: 'inherit',
})({
  flexGrow: 1,
})

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  left: 'auto',
  width: DRAWER_WIDTH
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  left: 'auto',
  '@media (min-width: 600px)': {
    width: 56
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  '@media (min-width: 600px)': {
    minHeight: 56,
  }
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({

  width: MAX_WIDTH + DRAWER_WIDTH,
  left: 'auto',
  right: 'auto',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: MAX_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

interface ItemProps {
  icon: React.ReactElement<any>
  text: string
  onClick: () => void
}

const Item: React.FC<ItemProps> = ({ icon, text, onClick }) => (
  <Tooltip title={text} placement="right" >
    <ListItem button onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </Tooltip>
)

const jump = (link: string) => () => navigate(link)

const PCMenu: React.FC = ({ children }) => {
  const user = useModel(userModel)
  const auth = useAuth()
  const { LOG_OUT } = userModel
  const { TOGGLE_DRAWER } = stateModel
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  const { useNotification } = useModel(settingModel, ['useNotification'])
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen} elevation={0}>
        <ToolbarS>
          <IconButtonS onClick={stateModel.OPEN_DRAWER}>
            <MenuIcon />
          </IconButtonS>
          <MainText>CC98</MainText>
          <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
        </ToolbarS>
      </AppBar>
      <Drawer variant="permanent" open={isDrawerOpen} >
        <DrawerHeader>
          <IconButton onClick={TOGGLE_DRAWER}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ListS>
          {user.isLogIn && (
            <>
              <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
              <Item icon={<IndexIcon />} text="首页" onClick={jump('/index')} />
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, padding: 0 }}>
        {children}
      </Box>
    </Box>
  )
}

export default PCMenu