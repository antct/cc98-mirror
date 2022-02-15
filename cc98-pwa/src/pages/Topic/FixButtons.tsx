import FixFab from '@/components/FixFab'
import { navigate } from '@/utils/history'
import { ITopic } from '@cc98/api'
import AddIcon from '@mui/icons-material/Add'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import RemoveIcon from '@mui/icons-material/Remove'
import ReplyIcon from '@mui/icons-material/Reply'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import SwapVertIcon from '@mui/icons-material/SwapVert'
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
    <>
      {expand && (
        <>
          {isShare ? (
              <>
                <FixFab order={3}>
                  <ArrowUpwardIcon onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }} />
                </FixFab>
                <FixFab order={2}>
                  <RotateRightIcon onClick={refreshFunc} />
                </FixFab>
              </>
            )
            : (
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
                  <ArrowUpwardIcon onClick={() => { window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }) }} />
                </FixFab>
                <FixFab order={3}>
                  <RotateRightIcon onClick={refreshFunc} />
                </FixFab>
                <FixFab order={2}>
                  <ReplyIcon onClick={() => navigate(`/editor/replyTopic/${topicInfo.boardId}/${topicInfo.id}`)} />
                </FixFab>
              </>
            )
          }
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
