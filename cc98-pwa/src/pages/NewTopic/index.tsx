import FixFab from '@/components/FixFab'
import { InfTopicList } from '@/components/TopicList'
import { IS_PC } from '@/config'
import { getNewTopics } from '@/services/topic'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'

export default () => {
  const [topicListKey, setTopicListKey] = useState(0)

  return (
    <>
      <InfTopicList key={topicListKey} service={getNewTopics} place="newtopic" />
      {!IS_PC &&
        <>
          <FixFab order={2} onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }}>
            <Tooltip title='顶部' placement='left'>
              <ArrowUpwardIcon />
            </Tooltip>
          </FixFab>
          <FixFab order={1} onClick={() => setTopicListKey(topicListKey + 1)}>
            <Tooltip title='刷新' placement='left'>
              <RotateRightIcon />
            </Tooltip>
          </FixFab>
        </>
      }
    </>
  )
}
