import { ITag } from '@cc98/api'
import { MenuItem, Select } from '@mui/material'
import React, { useEffect } from 'react'


interface Props {
  tags: ITag[]
  value?: number
  onChange: (tag: number) => void
}

export default ({ tags, value, onChange }: Props) => {
  useEffect(() => {
    if (value === undefined) {
      onChange(tags[0].id)
    }
  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, child: React.ReactNode) => {
    onChange(parseInt(e.target.value, 10))
  }

  return (
    <Select value={value} onChange={handleSelect} variant='standard' size="small">
      {tags.map(tag => (
        <MenuItem key={tag.id} value={tag.id}>
          {tag.name}
        </MenuItem>
      ))}
    </Select>
  )
}
