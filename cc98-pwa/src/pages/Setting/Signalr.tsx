import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, Switch } from '@mui/material'
import React from 'react'

export default () => {
  const { useSignalr } = useModel(settingModel, ['useSignalr'])
  const { TOGGLE_SIGNALR } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="实时通知" secondary="实时获取新通知（暂不可用）" />
      <Switch disabled={true} checked={useSignalr} onChange={TOGGLE_SIGNALR} />
    </ListItem>
  )
}
