import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, Switch } from '@mui/material'
import React from 'react'

export default () => {
  const { useCompress } = useModel(settingModel, ['useCompress'])
  const { TOGGLE_COMPRESS } = settingModel

  return (
    <ListItem>
      <ListItemText primary="图片压缩" secondary="节省网络带宽" />
      <Switch checked={useCompress} onChange={TOGGLE_COMPRESS} />
    </ListItem>
  )
}
