import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import stateModel from '@/models/state'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { Badge, Divider, Drawer, List, ListItem, ListItemIcon } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import GroupIcon from '@material-ui/icons/Group'
import HelpIcon from '@material-ui/icons/Help'
import HomeIcon from '@material-ui/icons/Home'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import CollectionsIcon from '@material-ui/icons/Photo'
import PageviewIcon from '@material-ui/icons/Pageview'
import PetsIcon from '@material-ui/icons/Pets'
import SettingsIcon from '@material-ui/icons/Settings'
import IndexIcon from '@material-ui/icons/List'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import BoardIcon from '@material-ui/icons/Dashboard'
import React from 'react'
import UserInfo from './UserInfo'
import { IS_PC } from '@/config'


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
  width: 180,
})

const DividerS = muiStyled(Divider)({
  margin: '0 16px',
  height: 1.5,
})

const jump = (link: string) => () => navigate(link)

const DrawerMenu: React.FC = () => {
  const user = useModel(userModel)
  const { LOG_OUT } = userModel
  const { CLOSE_DRAWER } = stateModel
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  const { useNotification } = useModel(settingModel, ['useNotification'])
  return (
    <>
      {IS_PC ?
        <Drawer variant='permanent'>
          <ListS onClick={CLOSE_DRAWER}>
            <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
            <DividerS />

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
                <Item icon={<GroupIcon />} text="好友" onClick={jump('/friend')} />
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
                <Item icon={<CancelIcon />} text="退出" onClick={LOG_OUT} />
              </>
            )}
          </ListS>
        </Drawer>
        :
        <Drawer open={isDrawerOpen} onClose={CLOSE_DRAWER}>
          <ListS onClick={CLOSE_DRAWER}>
            <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
            <DividerS />

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
                <Item icon={<GroupIcon />} text="好友" onClick={jump('/friend')} />
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
                <Item icon={<CancelIcon />} text="退出" onClick={LOG_OUT} />
              </>
            )}
          </ListS>
        </Drawer>
      }
    </>
  )
}

export default DrawerMenu
