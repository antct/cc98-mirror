import { navigate } from '@/utils/history'
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import BlockIcon from '@mui/icons-material/Block'
import InfoIcon from '@mui/icons-material/Info'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React, { useState } from 'react'


interface Props {
  boardId: string | number
}

export default ({ boardId }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItem = [
    {
      key: 0,
      name: '版面事件',
      router: `/board/${boardId}/record`,
      icon: <InfoIcon />,
    },
    {
      key: 1,
      name: '小黑屋',
      router: `/board/${boardId}/quietRoom`,
      icon: <BlockIcon />,
    },
  ]

  return <>
    <IconButton onClick={handleOpen} size="large">
      <MoreVertIcon />
    </IconButton>
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {menuItem.map(item => (
        <MenuItem
          key={item.key}
          onClick={() => {
            navigate(item.router)
            handleClose()
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <Typography>{item.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  </>;
}
