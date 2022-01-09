import FixFab from '@/components/FixFab'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import React, { useState } from 'react'
import Home from './Home'


export default () => {
  const [homeKey, setHomeKey] = useState(0)

  return (
    <>
      <Home key={homeKey} />
      <FixFab>
        <RotateRightIcon onClick={() => setHomeKey(homeKey + 1)} />
      </FixFab>
    </>
  )
}