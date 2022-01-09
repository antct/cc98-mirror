import SearchInput from '@/components/SearchInput'
import StickyBar from '@/components/StickyBar'
import { InfTopicList } from '@/components/TopicList'
import muiStyled from '@/muiStyled'
import { searchFavoriteTopics, searchTopics } from '@/services/topic'
import { getUserInfoListByName } from '@/services/user'
import { Tab, Tabs } from '@material-ui/core'
import { throttle } from 'lodash-es'
import React, { useState } from 'react'
// 这个地方重新写了一个InfUserList
import InfUserList from './compoents'

const StickyBarS = muiStyled(StickyBar)({
})

export default () => {
  const [current, setCurrent] = useState('topic')
  const [search, setSearch] = useState('')

  const onSearch = throttle((value: string) => {
    setSearch(value)
  }, 1000 * 10)

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setSearch('')
    setCurrent(value)
  }

  return (
    <>
      <StickyBar>
        <SearchInput placeholder="搜索主题，收藏或用户" onSearch={onSearch} />
      </StickyBar>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        value={current}
        onChange={handleChange}
      >
        <Tab value="topic" label="搜索主题" />
        <Tab value="favorite" label="搜索收藏" />
        <Tab value="user" label="搜索用户" />
      </Tabs>

      {current === 'topic' && <>
        {search && (
        <InfTopicList
          key={search}
          service={(from: number) => searchTopics(search, from)}
          place="search"
        />
        )}
      </>}
      {current === 'favorite' && <>
        {search && (
        <InfTopicList
          key={search}
          service={(from: number) => searchFavoriteTopics(search, from)}
          place="search"
        />
        )}
      </>}
      {current === 'user' && <>
        {search && (
        <InfUserList
          key={search}
          service={() => getUserInfoListByName(search) }
        />
        )}
      </>}
    </>
  )
}
