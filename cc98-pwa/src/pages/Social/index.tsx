import React, { useState } from 'react'

import { InfUserList } from '@/components/UserList'

import { Tab, Tabs } from '@material-ui/core'

import { getFollowee, getFollower } from '@/services/social'

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

      {current === 'followee' && <InfUserList service={getFollowee} />}
      {current === 'follower' && <InfUserList service={getFollower} />}
    </>
  )
}