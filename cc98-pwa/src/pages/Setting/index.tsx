import ListS from '@/hotfix/List'
import React from 'react'
import Avatar from './Avatar'
import Cache from './Cache'
import CDN from './CDN'
import Compress from './Compress'
import CustomWords from './CustomWords'
import CustomHome from './Home'
import Mode from './Mode'
import Notification from './Notification'
import Pagination from './Pagination'
import Signature from './Signature'
// import Signalr from './Signalr'
import Theme from './Theme'

const Setting: React.FC = () => (
  <ListS>
    {/* <Signalr /> */}
    <Theme />
    {/* <CustomHome /> */}
    <Mode />
    <Avatar />
    <Pagination />
    <Signature />
    <Notification />
    <Compress />
    <CDN />
    <Cache />
    <CustomWords />
  </ListS>
)

export default Setting
