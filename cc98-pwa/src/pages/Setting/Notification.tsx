import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, Switch } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import { ModeEnum } from '@/theme'

export default () => {
  const { useNotification} = useModel(settingModel, ['useNotification'])
  const { TOGGLE_NOTIFICATION } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="通知提醒" secondary="接收通知信息" />
      <Switch checked={useNotification} onChange={TOGGLE_NOTIFICATION} />
    </ListItem>
  )
}
