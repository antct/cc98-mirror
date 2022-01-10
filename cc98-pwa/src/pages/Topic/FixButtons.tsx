import FixFab from '@/components/FixFab'
import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'
import AddIcon from '@material-ui/icons/Add'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import RemoveIcon from '@material-ui/icons/Remove'
import ReplyIcon from '@material-ui/icons/Reply'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import React, { useState } from 'react'


interface Props {
  /**
   * 帖子信息
   */
  topicInfo: ITopic
  /**
   * 是否逆序
   */
  isReverse?: boolean
  /**
   * 刷新帖子的回调
   */
  refreshFunc: () => void
}

export default ({ topicInfo, isReverse, refreshFunc }: Props) => {
  // 控制按钮是否展开
  const [expand, setExpand] = useState(false)

  return (
    <>
      {expand && (
        <>
          <FixFab order={5}>
            <SwapVertIcon
              onClick={() =>
                isReverse
                  ? navigate(`/topic/${topicInfo.id}`)
                  : navigate(`/topic/${topicInfo.id}/reverse`)
              }
            />
          </FixFab>
          <FixFab order={4}>
            <ArrowUpwardIcon onClick={() => {window.scrollTo({left: 0, top: 0, behavior: 'smooth'})}} />
          </FixFab>
          <FixFab order={3}>
            <RotateRightIcon onClick={refreshFunc} />
          </FixFab>
          <FixFab order={2}>
            <ReplyIcon onClick={() => navigate(`/editor/replyTopic/${topicInfo.boardId}/${topicInfo.id}`)} />
          </FixFab>
        </>
      )}
      <FixFab>
        {expand ? (
          <RemoveIcon onClick={() => setExpand(false)} />
        ) : (
          <AddIcon onClick={() => setExpand(true)} />
        )}
      </FixFab>
    </>
  )
}
