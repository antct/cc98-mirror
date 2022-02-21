import FixFab from '@/components/FixFab'
import { IS_PC } from '@/config'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import Home from './Home'

export default () => {
  const [homeKey, setHomeKey] = useState(0)

  return (
    <>
      <Home key={homeKey} />
      {!IS_PC && <FixFab>
        <Tooltip title='刷新' placement='left'>
          <RotateRightIcon onClick={() => setHomeKey(homeKey + 1)} />
        </Tooltip>
      </FixFab>
      }
    </>
  )
}