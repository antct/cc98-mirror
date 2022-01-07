import React, { useState } from 'react'

import FixFab from '@/components/FixFab'
import { InfTopicList } from '@/components/TopicList'

import RotateRightIcon from '@material-ui/icons/RotateRight'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

import { getNewTopics } from '@/services/topic'

export default () => {
  const [topicListKey, setTopicListKey] = useState(0)

  return (
    <>
      <InfTopicList key={topicListKey} service={getNewTopics} place="newtopic" />
      <FixFab order={2}>
        <ArrowUpwardIcon onClick={() => {window.scrollTo({left: 0, top: 0, behavior: 'smooth'})}} />
      </FixFab>
      <FixFab order={1}>
        <RotateRightIcon onClick={() => setTopicListKey(topicListKey + 1)} />
      </FixFab>
    </>
  )
}
