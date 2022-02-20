import FixFab from '@/components/FixFab'
import { InfTopicList } from '@/components/TopicList'
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
      <FixFab order={2}>
        <Tooltip title='顶部' placement='left'>
          <ArrowUpwardIcon onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }} />
        </Tooltip>
      </FixFab>
      <FixFab order={1}>
        <Tooltip title='刷新' placement='left'>
          <RotateRightIcon onClick={() => setTopicListKey(topicListKey + 1)} />
        </Tooltip>
      </FixFab>
    </>
  )
}
