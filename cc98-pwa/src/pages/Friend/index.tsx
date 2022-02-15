import { InfUserList } from '@/components/UserList'
import { getFollowee, getFollower } from '@/services/social'
import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

export default () => {
  const [current, setCurrent] = useState('followee')

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setCurrent(value)
  }

  return (
    <>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        value={current}
        onChange={handleChange}
      >
        <Tab value="followee" label="关注" />
        <Tab value="follower" label="粉丝" />
      </Tabs>

      {current === 'followee' && <InfUserList service={getFollowee} place='followee' />}
      {current === 'follower' && <InfUserList service={getFollower} place='follower' />}
    </>
  )
}