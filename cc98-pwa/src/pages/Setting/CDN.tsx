import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, Switch } from '@mui/material'
import React from 'react'

export default () => {
  const { useCDN } = useModel(settingModel, ['useCDN'])
  const { TOGGLE_CDN } = settingModel

  return (
    <ListItem>
      <ListItemText primary="图床混合加速" secondary="CC98官方图片CDN" />
      <Switch checked={useCDN} onChange={TOGGLE_CDN} />
    </ListItem>
  )
}
