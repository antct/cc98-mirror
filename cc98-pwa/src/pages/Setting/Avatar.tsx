import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ListItem, Switch } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import { ModeEnum } from '@/theme'

export default () => {
  const { useAvatar } = useModel(settingModel, ['useAvatar'])
  const { TOGGLE_AVATAR } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="列表头像" secondary="列表显示用户头像" />
      <Switch checked={useAvatar} onChange={TOGGLE_AVATAR} />
    </ListItem>
  )
}
