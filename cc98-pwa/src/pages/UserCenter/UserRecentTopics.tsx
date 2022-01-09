import { InfTopicList } from '@/components/TopicList'
import { getMyRecentTopics, getUsersRecentTopics } from '@/services/topic'
import { IUser } from '@cc98/api'
import React, { useState } from 'react'
import ExpandPanel from './ExpandPanel'


interface Props {
  info: IUser
  isUserCenter: boolean
}

const RecentTopics: React.FC<Props> = ({ info, isUserCenter }) => {
  const [expand, setExpand] = useState(false)
  const onChange = () => {
    setExpand(!expand)
  }

  return (
    <ExpandPanel expanded={expand} title="发表主题" onChange={onChange}>
      {expand && (
        <InfTopicList
          service={
            isUserCenter ? getMyRecentTopics : (from: number) => getUsersRecentTopics(info.id, from)
          }
          place="usercenter"
        />
      )}
    </ExpandPanel>
  )
}

export default RecentTopics
