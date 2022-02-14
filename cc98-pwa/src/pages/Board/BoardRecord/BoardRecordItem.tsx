import { TopicItem } from '@/components/TopicList/TopicListItem'
import { navigate } from '@/utils/history'
import { IBoardEvent } from '@cc98/api'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
  /**
   * 事件信息
   */
  eventInfo: IBoardEvent
}

export default ({ eventInfo }: Props) => (
  <TopicItem
    title={eventInfo.content}
    isAnonymous={false}
    showAvatar={false}
    subtitle={`操作人: ${eventInfo.operatorUserName}`}
    info1={`${eventInfo.boardId === 182 ? '匿名用户' : eventInfo.targetUserName}`}
    info2={dayjs(eventInfo.time).fromNow()}
    onClick={() => navigate(`/topic/${eventInfo.topicId}`)}
  />
)
