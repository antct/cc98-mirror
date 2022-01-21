import { List } from '@material-ui/core'
import React from 'react'
import Avatar from './Avatar'
import Cache from './Cache'
import Compress from './Compress'
import CDN from './CDN'
import CustomHome from './Home'
import Mode from './Mode'
import Notification from './Notification'
import Signature from './Signature'
// import Signalr from './Signalr'
import Theme from './Theme'
import CustomWords from './CustomWords'

const Setting: React.FC = () => (
  <List>
    {/* <Signalr /> */}
    <Theme />
    <CustomHome />
    <Mode />
    <Avatar />
    <Signature />
    <Notification />
    <Compress />
    <CDN />
    <Cache />
    <CustomWords />
  </List>
)

export default Setting
