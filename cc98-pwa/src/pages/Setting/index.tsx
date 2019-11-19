import React from 'react'

import { List } from '@material-ui/core'

// import Signalr from './Signalr'
import Theme from './Theme'
import Mode from './Mode'
import Cache from './Cache'
import Compress from './Compress'
import CustomHome from './Home'

const Setting: React.FC = () => (
  <List>
    {/* <Signalr /> */}
    <Theme />
    <Mode />
    <Compress />
    <Cache />
    <CustomHome />
  </List>
)

export default Setting
