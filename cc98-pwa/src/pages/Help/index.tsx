import ListS from '@/hotfix/List'
import ListItemText from '@/hotfix/ListItemText'
import { ILocation, Route } from '@/router/Router'
import { navigate } from '@/utils/history'
import { ListItem, ListItemIcon } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart'
import RecommendIcon from '@material-ui/icons/BookOutlined'
import BugReportIcon from '@material-ui/icons/BugReportOutlined'
import CodeIcon from '@material-ui/icons/Code'
import CopyrightIcon from '@material-ui/icons/Copyright'
import EventIcon from '@material-ui/icons/EmojiEventsOutlined'
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined'
import MoneyIcon from '@material-ui/icons/MonetizationOnOutlined'
import MusicIcon from '@material-ui/icons/MusicNote'
import NatureIcon from '@material-ui/icons/NatureOutlined'
import NotListedIcon from '@material-ui/icons/NotListedLocationOutlined'
import ScoreIcon from '@material-ui/icons/ScoreOutlined'
import SmartphoneIcon from '@material-ui/icons/Smartphone'
import WifiTetheringIcon from '@material-ui/icons/WifiTethering'
import { Router } from '@reach/router'
import React from 'react'
import ActivityPoint from './ActivityPoint'
import DevTeam from './DevTeam'
import ProxyInfo from './ProxyInfo'
import SiteInfo from './SiteInfo'
import TransferWealth from './TransferWealth'

interface ItemProps {
  icon: React.ReactElement<any>
  text: string
  url: string
  external?: boolean
}

const Item: React.FC<ItemProps> = ({ icon, text, url, external = false }) => (
  <ListItem button onClick={external ? () => window.open(url) : () => navigate(url)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const Index = () => (
  <ListS>
    <Item icon={<BarChartIcon />} text="论坛统计" url="/help/siteInfo" />
    <Item icon={<WifiTetheringIcon />} text="论坛代理" url="/help/proxyInfo" />
    <Item icon={<CopyrightIcon />} text="开发人员" url="/help/devTeam" />
    <Item icon={<CodeIcon />} text="开发日志" url="https://github.com/ttcqaq/cc98-mirror" external={true} />
    <Item icon={<ScoreIcon />} text="活跃度" url="/help/activityPoint" />
    <Item icon={<EventIcon />} text="排行榜" url="https://rank.cc98.top/User/Wealth" external={true} />
    <Item icon={<MoneyIcon />} text="转账系统" url="/help/transferWealth" />
    <Item icon={<RecommendIcon />} text="推荐阅读" url="/topic/4833846/reverse" />
    <Item icon={<NatureIcon />} text="心灵树洞" url="/topic/4238943/reverse" />
    <Item icon={<MusicIcon />} text="广播点歌台" url="/topic/5180600" />
    <Item icon={<FavoriteIcon />} text="缘分表白墙" url="/topic/4628183/reverse" />
    <Item icon={<BugReportIcon />} text="新手代码测试楼" url="/topic/4759491" />
    <Item icon={<NotListedIcon />} text="论坛帮助" url="/topic/4970959" />
    <Item icon={<SmartphoneIcon />} text="如何添加到桌面" url="/topic/4813994" />
  </ListS>
)


export default React.memo(({ location }: ILocation) =>
  <Router location={location}>
    <Route path="/" component={Index} />
    <Route path="siteInfo" component={SiteInfo} />
    <Route path="proxyInfo" component={ProxyInfo} />
    <Route path="devTeam" component={DevTeam} />
    <Route path="activityPoint" component={ActivityPoint} />
    <Route path="transferWealth" component={TransferWealth} />
  </Router>
)