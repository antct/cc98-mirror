import { IconButton, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'
import styled from 'styled-components'

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 10px 10px 25px;
`

interface Props {
  onSearch: (value: string) => void
}

const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <SearchDiv>
      <TextField
        fullWidth
        placeholder="搜索主题"
        value={value}
        onChange={onChange}
      />
      <IconButton onClick={() => onSearch(value)}>
        <SearchIcon color="primary" />
      </IconButton>
    </SearchDiv>
  )
}

export default SearchInput
