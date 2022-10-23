import FixFab from '@/components/FixFab'
import SearchInput from '@/components/SearchInput'
import { InfSearchList } from '@/components/SearchList'
import StickyBar from '@/components/StickyBar'
import { InfTopicList } from '@/components/TopicList'
import muiStyled from '@/muiStyled'
import { searchFavoriteTopics, searchTopicContent, searchTopics } from '@/services/topic'
import { getUserInfoListByName } from '@/services/user'
import TimelineIcon from '@mui/icons-material/Timeline'
import { Tab, Tabs, Tooltip } from '@mui/material'
import { throttle } from 'lodash-es'
import React, { useState } from 'react'
// 这个地方重新写了一个InfUserList
import InfUserList from './compoents'

const StickyBarS = muiStyled(StickyBar)({
})

export default () => {
  const [current, setCurrent] = useState('content')
  const [placeholder, setPlaceholder] = useState('搜索关键词')
  const [search, setSearch] = useState('')
  const [searchSort, setSearchSort] = useState(0)
  const [searchKey, setSearchKey] = useState(0)

  const onSearch = throttle((value: string) => {
    setSearch(value)
    setSearchKey(prevKey => prevKey + 1)
  }, 1000 * 10)

  const handleChange = (e: React.ChangeEvent, value: string) => {
    setSearch('')
    setCurrent(value)
  }

  return (
    <>
      <StickyBar>
        <SearchInput placeholder={placeholder} onSearch={onSearch} />
      </StickyBar>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        value={current}
        onChange={handleChange}
      >
        <Tab value="content" label="搜索全文" />
        <Tab value="topic" label="搜索主题" />
        <Tab value="favorite" label="搜索收藏" />
        <Tab value="user" label="搜索用户" />
      </Tabs>
      {current === 'content' && <>
        {search && (
          <>
            <InfSearchList
              key={searchKey}
              service={(from: number) => searchTopicContent(search, from, searchSort)}
              place="search"
            />
            <FixFab onClick={
              () => {
                setSearchSort(prevState => 1 - prevState)
                setSearchKey(prevKey => prevKey + 1)
              }
            }>
              <Tooltip title='时序' placement='left'>
                <TimelineIcon
                  color={searchSort === 1 ? 'secondary' : 'inherit'}
                />
              </Tooltip>
            </FixFab>
          </>
        )}
      </>}
      {current === 'topic' && <>
        {search && (
          <InfTopicList
            key={searchKey}
            service={(from: number) => searchTopics(search, from)}
            place="search"
          />
        )}
      </>}
      {current === 'favorite' && <>
        {search && (
          <InfTopicList
            key={searchKey}
            service={(from: number) => searchFavoriteTopics(search, from)}
            place="search"
          />
        )}
      </>}
      {current === 'user' && <>
        {search && (
          <InfUserList
            key={searchKey}
            service={() => getUserInfoListByName(search)}
          />
        )}
      </>}
    </>
  )
}
