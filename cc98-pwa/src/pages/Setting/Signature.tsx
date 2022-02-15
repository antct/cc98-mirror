import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, Switch } from '@mui/material'
import React from 'react'

export default () => {
  const { useSignature } = useModel(settingModel, ['useSignature'])
  const { TOGGLE_SIGNATURE } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="签名档" secondary="显示用户个性签名" />
      <Switch checked={useSignature} onChange={TOGGLE_SIGNATURE} />
    </ListItem>
  )
}
