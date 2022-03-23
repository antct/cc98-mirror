import ListS from '@/hotfix/List'
import ListItemText from '@/hotfix/ListItemText'
import { ILocation, Route } from '@/router/Router'
import { navigate } from '@/utils/history'
import { ListItem, ListItemIcon } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import RecommendIcon from '@mui/icons-material/BookOutlined'
import BugReportIcon from '@mui/icons-material/BugReportOutlined'
import CodeIcon from '@mui/icons-material/Code'
import CopyrightIcon from '@mui/icons-material/Copyright'
import EventIcon from '@mui/icons-material/EmojiEventsOutlined'
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MoneyIcon from '@mui/icons-material/MonetizationOnOutlined'
import MusicIcon from '@mui/icons-material/MusicNote'
import NatureIcon from '@mui/icons-material/NatureOutlined'
import NotListedIcon from '@mui/icons-material/NotListedLocationOutlined'
import ScoreIcon from '@mui/icons-material/ScoreOutlined'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import WifiTetheringIcon from '@mui/icons-material/WifiTethering'
import FunIcon from '@mui/icons-material/CelebrationOutlined'
import { Router } from '@reach/router'
import React from 'react'
import ActivityPoint from './ActivityPoint'
import DevTeam from './DevTeam'
import ProxyInfo from './ProxyInfo'
import SiteInfo from './SiteInfo'
import TransferWealth from './TransferWealth'
import nexushdFun from './nexushdFun'

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
    <Item icon={<CodeIcon />} text="开发日志" url="https://github.com/antct/cc98-mirror" external={true} />
    <Item icon={<MoneyIcon />} text="转账系统" url="/help/transferWealth" />
    <Item icon={<RecommendIcon />} text="推荐阅读" url="/topic/4833846/reverse" />
    <Item icon={<NatureIcon />} text="心灵树洞" url="/topic/4238943/reverse" />
    <Item icon={<ScoreIcon />} text="论坛活跃度" url="/help/activityPoint" />
    <Item icon={<EventIcon />} text="财富排行榜" url="https://rank.cc98.top/User/Wealth" external={true} />
    <Item icon={<FunIcon />} text="NexusHD趣味盒" url="/help/nexushdFun" />
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
    <Route path="nexushdFun" component={nexushdFun} />
    <Route path="activityPoint" component={ActivityPoint} />
    <Route path="transferWealth" component={TransferWealth} />
  </Router>
)