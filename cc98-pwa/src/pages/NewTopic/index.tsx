import FixFab from '@/components/FixFab'
import { InfTopicList } from '@/components/TopicList'
import { IS_PC } from '@/config'
import { getNewTopics, getRandomRecommendedTopics, getRandomRecentTopics } from '@/services/topic'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'

export default () => {
  const [newTopicListKey, setNewTopicListKey] = useState(0)
  const [randomRecommendListKey, setRandomRecommendListKey] = useState(0)
  const [randomRecentListKey, setRandomRecentListKey] = useState(0)
  const [current, setCurrent] = useState('newtopic')

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setCurrent(value)
  }

  return (
    <>
      <Tabs
        value={current}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab value="newtopic" label="新帖" />
        <Tab value="randomtopic" label="精选" />
        <Tab value="randomrecent" label="随机" />
      </Tabs>

      {current === 'newtopic' &&
        <>
          <InfTopicList key={newTopicListKey} service={getNewTopics} place="newtopic" />
          {!IS_PC &&
            <>
              {/* <FixFab order={2} onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }}>
            <Tooltip title='顶部' placement='left'>
              <ArrowUpwardIcon />
            </Tooltip>
          </FixFab> */}
              <FixFab order={1} onClick={() => setNewTopicListKey(newTopicListKey + 1)}>
                <Tooltip title='刷新' placement='left'>
                  <RotateRightIcon />
                </Tooltip>
              </FixFab>
            </>
          }
        </>
      }
      {current === 'randomtopic' &&
        <>
          <InfTopicList key={randomRecommendListKey} service={getRandomRecommendedTopics} place="randomtopic" />
          {!IS_PC &&
            <>
              {/* <FixFab order={2} onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }}>
            <Tooltip title='顶部' placement='left'>
              <ArrowUpwardIcon />
            </Tooltip>
          </FixFab> */}
              <FixFab order={1} onClick={() => setRandomRecommendListKey(randomRecommendListKey + 1)}>
                <Tooltip title='刷新' placement='left'>
                  <RotateRightIcon />
                </Tooltip>
              </FixFab>
            </>
          }
        </>
      }
      {current === 'randomrecent' &&
        <>
          <InfTopicList key={randomRecentListKey} service={getRandomRecentTopics} place="newtopic" />
          {!IS_PC &&
            <>
              {/* <FixFab order={2} onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }}>
            <Tooltip title='顶部' placement='left'>
              <ArrowUpwardIcon />
            </Tooltip>
          </FixFab> */}
              <FixFab order={1} onClick={() => setRandomRecentListKey(randomRecentListKey + 1)}>
                <Tooltip title='刷新' placement='left'>
                  <RotateRightIcon />
                </Tooltip>
              </FixFab>
            </>
          }
        </>
      }
    </>

  )
}
