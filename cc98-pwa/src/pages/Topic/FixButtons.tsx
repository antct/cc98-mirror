import FixFab from '@/components/FixFab'
import { IS_PC } from '@/config'
import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'
import AddIcon from '@mui/icons-material/Add'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import RemoveIcon from '@mui/icons-material/Remove'
import ReplyIcon from '@mui/icons-material/Reply'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { Tooltip } from '@mui/material'
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
   * 是否是分享模式
   */
  isShare?: boolean
  /**
   * 刷新帖子的回调
   */
  refreshFunc: () => void
}

export default ({ topicInfo, isReverse, isShare, refreshFunc }: Props) => {
  // 控制按钮是否展开
  const [expand, setExpand] = useState(false)

  return (
    (isShare) ? null :
      <>
        {expand && (
          IS_PC ?
            <>
              <FixFab order={3}
                onClick={() =>
                  isReverse
                    ? navigate(`/topic/${topicInfo.id}`)
                    : navigate(`/topic/${topicInfo.id}/reverse`)
                }
              >
                <Tooltip title='倒序' placement='left'>
                  <SwapVertIcon />
                </Tooltip>
              </FixFab>
              <FixFab order={2} onClick={() => navigate(`/editor/replyTopic/${topicInfo.boardId}/${topicInfo.id}`)}>
                <Tooltip title='回复' placement='left'>
                  <ReplyIcon />
                </Tooltip>
              </FixFab>
            </>
            :
            <>
              <FixFab order={5}
                onClick={() =>
                  isReverse
                    ? navigate(`/topic/${topicInfo.id}`)
                    : navigate(`/topic/${topicInfo.id}/reverse`)
                }
              >
                <Tooltip title='倒序' placement='left'>
                  <SwapVertIcon />
                </Tooltip>
              </FixFab>
              <FixFab order={4} onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }}>
                <Tooltip title='顶部' placement='left'>
                  <ArrowUpwardIcon />
                </Tooltip>
              </FixFab>
              <FixFab order={3} onClick={refreshFunc}>
                <Tooltip title='刷新' placement='left'>
                  <RotateRightIcon />
                </Tooltip>
              </FixFab>
              <FixFab order={2} onClick={() => navigate(`/editor/replyTopic/${topicInfo.boardId}/${topicInfo.id}`)}>
                <Tooltip title='回复' placement='left'>
                  <ReplyIcon />
                </Tooltip>
              </FixFab>
            </>
        )}

        {expand ? (
          <FixFab onClick={() => setExpand(false)}>
            <Tooltip title='关闭' placement='left'>
              <RemoveIcon />
            </Tooltip>
          </FixFab>
        ) : (
          <FixFab onClick={() => setExpand(true)}>
            <Tooltip title='选项' placement='left'>
              <AddIcon />
            </Tooltip>
          </FixFab>
        )}
      </>
  )
}
