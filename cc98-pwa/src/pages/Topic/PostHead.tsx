import StickyHeadBar from '@/components/StickyBar/StickyHeadBar'
import { IS_PC } from '@/config'
import historyModel from '@/models/history'
import { getBoardNameById } from '@/services/board'
import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'
import React, { useEffect, useState } from 'react'
import PostActions from './PostActions'


interface Props {
  topicInfo: ITopic
  refreshFunc: () => void
  isShare: boolean
}

const PostHead: React.FC<Props> = ({ topicInfo, refreshFunc, isShare }) => {
  const [boardName, setBoardName] = useState('')

  useEffect(() => {
    getBoardNameById(topicInfo.boardId).then(boardName => setBoardName(boardName))
  }, [topicInfo.boardId])

  useEffect(() => {
    historyModel.PUSH({
      id: topicInfo.id,
      title: topicInfo.title,
      lastViewTime: Date.now(),
    })
  }, [])

  return (
    <StickyHeadBar
      title={topicInfo.title}
      titleClick={isShare ? undefined : () => navigate(`/topic/${topicInfo.id}`)}
      subTitle={boardName}
      subTitleClick={isShare ? undefined : () => navigate(`/board/${topicInfo.boardId}`)}
      action={<PostActions topicInfo={topicInfo} refreshFunc={refreshFunc} isShare={isShare} />}
      isShare={isShare || IS_PC}
    />
  )
}

export default PostHead
