import { InfUserList } from '@/components/UserList'
import userModel from '@/models/user'
import { getFollowee, getFollower } from '@/services/social'
import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default () => {
  const [current, setCurrent] = useState('followee')
  const { FRESH_FAN } = userModel

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setCurrent(value)
  }

  useEffect(() => {
    FRESH_FAN()
  }, [])

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