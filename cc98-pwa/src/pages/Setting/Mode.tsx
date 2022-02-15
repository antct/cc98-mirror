import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ModeEnum } from '@/theme'
import { ListItem, Switch } from '@mui/material'
import React from 'react'

const Theme = () => {
  const { mode } = useModel(settingModel, ['mode'])
  const { TOGGLE_MODE } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="夜间模式" secondary="使用暗色主题" />
      <Switch checked={mode === ModeEnum.DARK} onChange={TOGGLE_MODE} />
    </ListItem>
  )
}

export default React.memo(Theme)
