import { List } from '@material-ui/core'
import React from 'react'
import Avatar from './Avatar'
import Cache from './Cache'
import Compress from './Compress'
import CustomHome from './Home'
import Mode from './Mode'
import Notification from './Notification'
import Signature from './Signature'
// import Signalr from './Signalr'
import Theme from './Theme'

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
    <Cache />
  </List>
)

export default Setting
