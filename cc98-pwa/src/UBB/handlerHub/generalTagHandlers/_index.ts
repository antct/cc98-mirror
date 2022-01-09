import { IHandlerHub } from '@cc98/ubb-core'
import React from 'react'
import ac from './ac'
import cc98 from './cc98'
import em from './em'
import line from './line'
import mahjong from './mahjong'
import ms from './ms'
import needreply from './needreply'
import tb from './tb'


const generalTagHandlers: IHandlerHub<React.ReactNode>['generalTagHandlers'] = [
  ac,
  em,
  mahjong,
  ms,
  needreply,
  tb,
  cc98,

  // tag without close
  line,
]

export default generalTagHandlers
