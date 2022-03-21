import { TopicItem } from '@/components/TopicList/TopicListItem'
import { ANONYMOUS_AVATAR } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { getBoardNameById } from '@/services/board'
import { navigate } from '@/utils/history'
import { IHotTopic } from '@cc98/api'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'


interface Props {
  /**
   * 帖子信息
   */
  data: IHotTopic
  portraitUrl?: string
}

export default ({ data, portraitUrl }: Props) => {
  const [boardName, setBoardName] = useState('')
  const { TRANS_IMG } = settingModel

  useEffect(() => {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [])

  return (
    <TopicItem
      showAvatar={true}
      portraitUrl={data.isAnonymous ? TRANS_IMG(ANONYMOUS_AVATAR, true) : TRANS_IMG(portraitUrl, true)}
      onClick={() => navigate(`/topic/${data.id}`)}
      title={data.title}
      subtitle={data.authorName ? data.authorName : '[匿名]'}
      info1={boardName}
      info2={dayjs(data.createTime).fromNow()}
      hitCount={data.hitCount}
      replyCount={data.replyCount}
    />
  )
}
