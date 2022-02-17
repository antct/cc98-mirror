import { MenuItem, Select } from '@mui/material'
import React from 'react'


const PostType = [{ id: 0, name: '普通' }, { id: 1, name: '校园活动' }, { id: 2, name: '学术信息' }]

interface Props {
  value: number
  onChange: (id: number) => void
}

export default ({ value, onChange }: Props) => {
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, child: React.ReactNode) => {
    onChange(parseInt(e.target.value, 10))
  }

  return (
    <Select value={value} variant='standard' size="small" onChange={handleSelect}>
      {PostType.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  )
}
