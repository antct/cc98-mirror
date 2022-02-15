import { Typography } from '@mui/material'
import React from 'react'

const TextPrimary: React.FC = ({ children }) => (
  <Typography variant="body2" color="textPrimary">
    {children}
  </Typography>
)

const TextSecondary: React.FC = ({ children }) => (
  <Typography variant="body2" color="textSecondary">
    {children}
  </Typography>
)

export { TextPrimary, TextSecondary }
