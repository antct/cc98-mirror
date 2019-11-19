import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, Switch } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import { ModeEnum } from '@/theme'

export default () => {
  const { useCompress } = useModel(settingModel, ['useCompress'])
  const { TOGGLE_COMPRESS } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="图片压缩" secondary="节省网络带宽" />
      <Switch checked={useCompress} onChange={TOGGLE_COMPRESS} />
    </ListItem>
  )
}
