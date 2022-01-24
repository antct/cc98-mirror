import userModel from '@/models/user'
import { getBoardMastersById } from '@/services/board'
import { judgeEdit, judgeManager, judgeManagerOrBoardMasters } from '@/utils/ActionsJudge'
import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { IPost, IUser } from '@cc98/api'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useEffect, useState } from 'react'
// TODO: fix
import Judge from '../Dialog/Judge'
import Manage from '../Dialog/Manage'

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo: IUser | undefined
  /**
   * 是否追踪
   */
  isTrace: boolean
  /**
   * 更新 Post 信息
   */
  refreshPost: () => void
}

const MenuActions: React.FC<Props> = ({ postInfo, isTrace, refreshPost, userInfo }) => {
  // 控制 Menu 的显示
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function checkLogIn() {
    if (!userModel.state.isLogIn) {
      snackbar.error('请先登录')

      return false
    }

    return true
  }

  const handleTrace = () => {
    if (!checkLogIn()) {
      handleClose()
      return
    }
    if (isTrace) {
      navigate(`/topic/${postInfo.topicId}`)
    } else {
      navigate(`/topic/${postInfo.topicId}/trace/${postInfo.id}`)
    }
    handleClose()
  }

  // const handleShare = () => {
  //   if (document.location) {
  //     copy2Clipboard(
  //       `https://${document.location.host}/topic/${postInfo.topicId}#${postInfo.floor}`
  //     )
  //   }
  //   snackbar.success('分享链接已经成功复制到剪切板')
  //   handleClose()
  // }

  // 控制 评分 的显示
  const [showJudge, setShowJudge] = useState(false)
  const [showManage, setShowManage] = useState(false)

  const [boardMasters, setBoardMasters] = useState<string[]>([])

  useEffect(() => {
    getBoardMastersById(postInfo.boardId).then(res => setBoardMasters(res))
  }, [postInfo.boardId])

  const judgeOpen = () => setShowJudge(true)
  const judgeClose = () => setShowJudge(false)

  const manageOpen = () => setShowManage(true)
  const manageClose = () => setShowManage(false)

  const handleJudge = () => {
    if (!checkLogIn()) {
      handleClose()
      return
    }
    judgeOpen()
    handleClose()
  }

  const handleManage = () => {
    if (!checkLogIn()) {
      handleClose()
      return
    }
    manageOpen()
    handleClose()
  }

  const myInfo = userModel.state.myInfo
  // 编辑操作
  const canEdit = judgeEdit(myInfo, userInfo, postInfo, boardMasters)
  // 管理操作
  const canManage = judgeManagerOrBoardMasters(myInfo, boardMasters)
  // 管理员才有的管理操作
  const onlyManager = judgeManager(myInfo)

  return (
    <>
      {showJudge && (
        <Judge postInfo={postInfo} handleClose={judgeClose} refreshPost={refreshPost} />
      )}
      {showManage && (
        <Manage
          postInfo={postInfo}
          handleClose={manageClose}
          refreshPost={refreshPost}
          isManager={onlyManager}
        />
      )}
      <IconButton onClick={handleOpen}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleTrace}>{isTrace ? '返回' : '追踪'}</MenuItem>
        {canEdit && (
          <MenuItem
            onClick={() => {
              navigate(`/editor/edit/${postInfo.boardId}/${postInfo.id}`)
              handleClose()
            }}
          >
            编辑
          </MenuItem>
        )}
        <MenuItem onClick={handleJudge}>评分</MenuItem>
        {/* <MenuItem onClick={handleShare}>分享</MenuItem> */}
        {canManage && <MenuItem onClick={handleManage}>管理</MenuItem>}
      </Menu>
    </>
  )
}

export default MenuActions
