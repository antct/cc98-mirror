import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, Switch } from '@mui/material'
import React from 'react'

export default () => {
  const { useNotification} = useModel(settingModel, ['useNotification'])
  const { TOGGLE_NOTIFICATION } = settingModel

  return (
    <ListItem>
      <ListItemText primary="通知提醒" secondary="接收通知信息" />
      <Switch checked={useNotification} onChange={TOGGLE_NOTIFICATION} />
    </ListItem>
  )
}
