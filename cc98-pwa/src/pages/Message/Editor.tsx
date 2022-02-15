import muiStyled from '@/muiStyled'
import { IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import React, { useState } from 'react'

const MyIconButton = muiStyled(IconButton)({
  position: 'relative',
  marginRight: -12,
  marginBottom: -2,
})

interface Props {
  callback: (content: string) => void
}

export default ({ callback }: Props) => {
  const [content, setContent] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleSend = () => {
    callback(content)
  }

  return (
    <TextField
      label="私信内容"
      variant="filled"
      fullWidth
      value={content}
      onChange={handleInputChange}
      InputProps={{
        endAdornment: (
          <MyIconButton onClick={handleSend}>
            <SendIcon />
          </MyIconButton>
        ),
      }}
    />
  )
}
