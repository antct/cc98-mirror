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
    isShare ? null :
    <>
      {expand && (
        <>
          IS_PC ?
          <>
            <FixFab order={3}>
              <Tooltip title='倒序' placement='left'>
                <SwapVertIcon
                  onClick={() =>
                    isReverse
                      ? navigate(`/topic/${topicInfo.id}`)
                      : navigate(`/topic/${topicInfo.id}/reverse`)
                  }
                />
              </Tooltip>
            </FixFab>
            <FixFab order={2}>
              <Tooltip title='回复' placement='left'>
                <ReplyIcon onClick={() => navigate(`/editor/replyTopic/${topicInfo.boardId}/${topicInfo.id}`)} />
              </Tooltip>
            </FixFab>
          </>
          :
          <>
            <FixFab order={5}>
              <Tooltip title='倒序' placement='left'>
                <SwapVertIcon
                  onClick={() =>
                    isReverse
                      ? navigate(`/topic/${topicInfo.id}`)
                      : navigate(`/topic/${topicInfo.id}/reverse`)
                  }
                />
              </Tooltip>
            </FixFab>
            <FixFab order={4}>
              <Tooltip title='顶部' placement='left'>
                <ArrowUpwardIcon onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }} />
              </Tooltip>
            </FixFab>
            <FixFab order={3}>
              <Tooltip title='刷新' placement='left'>
                <RotateRightIcon onClick={refreshFunc} />
              </Tooltip>
            </FixFab>
            <FixFab order={2}>
              <Tooltip title='回复' placement='left'>
                <ReplyIcon onClick={() => navigate(`/editor/replyTopic/${topicInfo.boardId}/${topicInfo.id}`)} />
              </Tooltip>
            </FixFab>
          </>
          )
        </>
      )}
      <FixFab>
        {expand ? (
          <Tooltip title='关闭' placement='left'>
            <RemoveIcon onClick={() => setExpand(false)} />
          </Tooltip>
        ) : (
          <Tooltip title='选项' placement='left'>
            <AddIcon onClick={() => setExpand(true)} />
          </Tooltip>
        )}
      </FixFab>
    </>
  )
}
