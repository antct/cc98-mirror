import useModel from '@/hooks/useModel'
import ListItemText from '@/hotfix/ListItemText'
import settingModel from '@/models/setting'
import { ListItem, MenuItem, TextField } from '@mui/material'
import React from 'react'

const ranges = [
  { label: '首页', value: 1 },
  { label: '热门', value: 2 },
  { label: '新帖', value: 3 },
  { label: '关注', value: 4 },
]

const Home = () => {
  const { customHome } = useModel(settingModel, ['customHome'])
  const { CHANGE_CUSTOMHOME } = settingModel

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    CHANGE_CUSTOMHOME(parseInt(event.target.value, 10))
  }

  return (
    <ListItem>
      <ListItemText primary="主页设置" secondary="自定义主页内容" />
      <TextField select value={customHome} size="small" onChange={handleChange}>
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </ListItem>
  )
}

export default React.memo(Home)
