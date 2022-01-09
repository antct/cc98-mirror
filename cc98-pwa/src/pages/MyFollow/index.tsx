import { InfTopicList } from '@/components/TopicList'
import { getFavoriteTopics, getFavoriteTopicsOrderByUpdate, getFollowBoardsTopics, getFollowUsersTopics } from '@/services/topic'
import { Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'

export default () => {
  const [current, setCurrent] = useState('board')

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
        <Tab value="board" label="关注版面" />
        <Tab value="user" label="关注用户" />
        <Tab value="topic" label="我的收藏" />
        <Tab value="topic-update" label="收藏更新" />
      </Tabs>

      {current === 'board' && <InfTopicList service={getFollowBoardsTopics} place="follow" />}
      {current === 'user' && <InfTopicList service={getFollowUsersTopics} place="follow" />}
      {current === 'topic' && <InfTopicList service={getFavoriteTopics} place="follow" />}
      {current === 'topic-update' && <InfTopicList service={getFavoriteTopicsOrderByUpdate} place="follow-update" />}
    </>
  )
}
