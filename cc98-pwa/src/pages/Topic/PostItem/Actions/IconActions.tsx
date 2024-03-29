import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { putDislike, putLike } from '@/services/post'
import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { ILikeState, IPost } from '@cc98/api'
import { IconButton, Typography } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import React from 'react'
import styled from 'styled-components'

// @babel/plugin-transform-typescript does not support const enums
enum LikeState {
  NONE = 0,
  LIKE = 1,
  DISLIKE = 2,
}

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 更新 Post 信息
   */
  refreshPost: () => void
  isShare: boolean
}

const ActionDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
`

const Count = muiStyled(Typography).attrs({
  color: 'textSecondary',
})({
  marginLeft: -2,
  marginRight: 12,
})

const DividerCol = muiStyled('span')(({ theme }) => ({
  margin: '0 4px',
  height: '1em',
  border: `solid thin ${theme.palette.text.secondary}`,
}))

/**
 * 检查是否登录
 */
function checkLogIn() {
  if (!userModel.state.isLogIn) {
    snackbar.error('请先登录')

    return false
  }

  return true
}

const IconActions: React.FC<Props> = ({ postInfo, refreshPost, isShare }) => {
  const { likeState } = postInfo

  const handleLike = (newLikeState: ILikeState) => () => {
    if (!checkLogIn()) return

    const putService = newLikeState === 1 ? putLike : putDislike

    putService(postInfo.id).then(res =>
      res.fail().succeed(_ => {
        refreshPost()
      })
    )
  }

  const handleQuote = () => {
    if (!checkLogIn()) return

    if (postInfo.isDeleted) {
      snackbar.error('不能引用已删除的帖子')

      return
    }
    navigate(`/editor/replyTopic/${postInfo.boardId}/${postInfo.topicId}/quote/${postInfo.floor}`)
  }

  return (
    <ActionDiv>
      <IconButton disabled={isShare} onClick={handleLike(LikeState.LIKE)} size="large">
        <ThumbUpIcon
          fontSize="small"
          color={likeState === LikeState.LIKE ? 'secondary' : 'inherit'}
        />
      </IconButton>
      <Count>{postInfo.likeCount}</Count>

      <DividerCol />

      <IconButton disabled={isShare} onClick={handleLike(LikeState.DISLIKE)} size="large">
        <ThumbDownIcon
          fontSize="small"
          color={likeState === LikeState.DISLIKE ? 'secondary' : 'inherit'}
        />
      </IconButton>
      <Count>{postInfo.dislikeCount}</Count>

      <DividerCol />
      <IconButton disabled={isShare} onClick={handleQuote} size="large">
        <FormatQuoteIcon fontSize="small" />
      </IconButton>
    </ActionDiv>
  );
}

export default IconActions
