import muiStyled from '@/muiStyled'
import { InputBase } from '@mui/material'
import React from 'react'
import { EditorModel } from './EditorModel'


const InputArea = muiStyled(InputBase).attrs({
  fullWidth: true,
  multiline: true,
  autoFocus: true,
  rows: 6,
  maxRows: 10,
})({
  marginTop: 8,
  padding: '12px 8px',
  border: '1.5px solid #ccc',
})

interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => {
  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    editor.replaceMainContent(event.target.value)
  }

  return (
    <InputArea
      value={editor.state.mainContent}
      // placeholder="CC98 干杯~ (￣ε(#￣) Σ"
      onChange={handlerChange}
      onFocus={(e) =>
        e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length
        )}
    />
  )
}
