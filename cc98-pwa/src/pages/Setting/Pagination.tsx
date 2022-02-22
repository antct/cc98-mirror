import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, Switch } from '@mui/material'
import React from 'react'

export default () => {
  const { usePagination } = useModel(settingModel, ['usePagination'])
  const { TOGGLE_PAGINATION } = settingModel

  return (
    <ListItem button>
      <ListItemText primary="分页视图" secondary="帖子分页视图" />
      <Switch checked={usePagination} onChange={TOGGLE_PAGINATION} />
    </ListItem>
  )
}
