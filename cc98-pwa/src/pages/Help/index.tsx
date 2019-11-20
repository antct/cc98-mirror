import React from 'react'
import { Router } from '@reach/router'
import { Route } from '@/router/Router'

import { List, ListItem, ListItemIcon } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import BarChartIcon from '@material-ui/icons/BarChart'
import CopyrightIcon from '@material-ui/icons/Copyright'
import SmartphoneIcon from '@material-ui/icons/Smartphone'

import { navigate } from '@/utils/history'

import SiteInfo from './SiteInfo'
import DevTeam from './DevTeam'

interface ItemProps {
  icon: React.ReactElement<any>
  text: string
  url: string
}

const Item: React.FC<ItemProps> = ({ icon, text, url }) => (
  <ListItem button onClick={() => navigate(url)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const Index = () => (
  <List>
    <Item icon={<BarChartIcon />} text="论坛统计" url="/help/siteInfo" />
    <Item icon={<CopyrightIcon />} text="开发人员" url="/help/devTeam" />
    <Item icon={<SmartphoneIcon />} text="如何添加到桌面" url="/topic/4813994" />
  </List>
)

export default () => (
  <Router>
    <Route path="/" component={Index} />
    <Route path="siteInfo" component={SiteInfo} />
    <Route path="devTeam" component={DevTeam} />
  </Router>
)
