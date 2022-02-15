import { InputBase } from '@mui/material'
import { Theme, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'


const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    right: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

interface Props {
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({ placeholder, onChange, onSearch }) => {
  const [value, setValue] = useState('')

  const classes = useStyles()

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  const onSearchClick = () => {
    onSearch && onSearch(value)
  }

  return (
    <div className={classes.search}>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={value}
        onChange={inputOnChange}
      />
      <div className={classes.searchIcon}>
        <SearchIcon color="inherit" onClick={onSearchClick} />
      </div>
    </div>
  )
}

export default SearchInput
