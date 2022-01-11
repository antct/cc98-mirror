import ListItemText from '@/hotfix/ListItemText'
import { Route } from '@/router/Router'
import { navigate } from '@/utils/history'
import { List, ListItem, ListItemIcon } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart'
import CodeIcon from '@material-ui/icons/Code'
import CopyrightIcon from '@material-ui/icons/Copyright'
import EventIcon from '@material-ui/icons/EmojiEventsOutlined'
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined'
import MoneyIcon from '@material-ui/icons/MonetizationOnOutlined'
import MusicIcon from '@material-ui/icons/MusicNote'
import NatureIcon from '@material-ui/icons/NatureOutlined'
import NotListedIcon from '@material-ui/icons/NotListedLocationOutlined'
import SmartphoneIcon from '@material-ui/icons/Smartphone'
import RecommendIcon from '@material-ui/icons/ThumbUpOutlined'
import { Router } from '@reach/router'
import React from 'react'
import DevTeam from './DevTeam'
import SiteInfo from './SiteInfo'
import TransferWealth from './TransferWealth'


interface ItemProps {
  icon: React.ReactElement<any>
  text: string
  url: string
  external?: boolean
}

const Item: React.FC<ItemProps> = ({ icon, text, url, external=false }) => (
  <ListItem button onClick={external ? () => window.open(url) : () => navigate(url)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const Index = () => (
  <List>
    <Item icon={<BarChartIcon />} text="论坛统计" url="/help/siteInfo" />
    <Item icon={<CopyrightIcon />} text="开发组" url="/help/devTeam" />
    <Item icon={<CodeIcon />} text="开发日志" url="https://github.com/ttcqaq/cc98-mirror" external={true} />
    <Item icon={<EventIcon />} text="排行榜" url="https://rank.cc98.top/User/Wealth" external={true} />
    <Item icon={<MoneyIcon />} text="转账系统" url="/help/transferWealth" />
    <Item icon={<RecommendIcon />} text="推荐阅读" url="/topic/4833846/reverse" />
    <Item icon={<NatureIcon />} text="心灵树洞" url="/topic/4238943/reverse" />
    <Item icon={<MusicIcon />} text="广播点歌台" url="/topic/5180600" />
    <Item icon={<FavoriteIcon />} text="缘分表白墙" url="/topic/4628183/reverse" />
    <Item icon={<NotListedIcon />} text="论坛帮助" url="/topic/4970959" />
    <Item icon={<SmartphoneIcon />} text="如何添加到桌面" url="/topic/4813994" />
  </List>
)

export default () => (
  <Router>
    <Route path="/" component={Index} />
    <Route path="siteInfo" component={SiteInfo} />
    <Route path="devTeam" component={DevTeam} />
    <Route path="transferWealth" component={TransferWealth} />
  </Router>
)
