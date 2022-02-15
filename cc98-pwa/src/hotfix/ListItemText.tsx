import { ListItemText, Typography } from '@mui/material'
import { ListItemTextProps } from '@mui/material/ListItemText'
import React from 'react'


const ListItemText_FixedThemeBug: React.FC<ListItemTextProps> = props => (
  <ListItemText
    primary={
      <Typography variant="body1" color="textPrimary">
        {props.primary}
      </Typography>
    }
    secondary={
      <Typography variant="body2" color="textSecondary">
        {props.secondary}
      </Typography>
    }
  />
)

export default ListItemText_FixedThemeBug
