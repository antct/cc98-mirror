import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, Switch } from '@material-ui/core'
import React from 'react'

export default () => {
  const { useCDN } = useModel(settingModel, ['useCDN'])
  const { TOGGLE_CDN } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="官方图床混合加速" secondary="在某些场景下使用官方图片CDN" />
      <Switch checked={useCDN} onChange={TOGGLE_CDN} />
    </ListItem>
  )
}
