import { TopicItem } from '@/components/TopicList/TopicListItem'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { getBoardNameById } from '@/services/board'
import { navigate } from '@/utils/history'
import { IHotTopic } from '@cc98/api'
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
  const { useCompress, useAvatar } = useModel(settingModel, ['useCompress', 'useAvatar'])

  useEffect(() => {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [])

  return (
    <TopicItem
      isAnonymous={data.isAnonymous}
      portraitShow={useAvatar}
      portraitUrl={!!portraitUrl ? `${portraitUrl}?compress=${useCompress}&width=50` : portraitUrl}
      onClick={() => navigate(`/topic/${data.id}`)}
      title={data.title}
      subtitle={data.authorName ? data.authorName : '[匿名]'}
      info1={boardName}
      info2={`回贴:${data.replyCount}`}
    />
  )
}
