import React from 'react'

import { List } from '@material-ui/core'

// import Signalr from './Signalr'
import Theme from './Theme'
import Mode from './Mode'
import Cache from './Cache'
import Compress from './Compress'
import Signature from './Signature'
import Avatar from './Avatar'
import Notification from './Notification'
import CustomHome from './Home'

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
