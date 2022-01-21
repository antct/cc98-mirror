import { TopicItem } from '@/components/TopicList/TopicListItem'
import { AVATAR_COMPRESS_WIDTH, CDN } from '@/config'
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
  const { useCompress, useAvatar, useCDN } = useModel(settingModel, ['useCompress', 'useAvatar', 'useCDN'])

  useEffect(() => {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [])

  return (
    <TopicItem
      isAnonymous={data.isAnonymous}
      showAvatar={useAvatar}
      portraitUrl={!!portraitUrl ? `${!useCDN ? `${portraitUrl}?compress=${useCompress}&width=${AVATAR_COMPRESS_WIDTH}` : CDN(portraitUrl, true)}` : portraitUrl}
      onClick={() => navigate(`/topic/${data.id}`)}
      title={data.title}
      subtitle={data.authorName ? data.authorName : '[匿名]'}
      info1={boardName}
      info2={`回贴:${data.replyCount}`}
    />
  )
}
