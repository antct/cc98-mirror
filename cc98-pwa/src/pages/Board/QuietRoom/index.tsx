import useFetcher from '@/hooks/useFetcher'
import userModel from '@/models/user'
import { getBoardInfo, getBoardStopPostUser } from '@/services/board'
import { navigateHandler } from '@/services/utils/errorHandler'
import { judgeManagerOrBoardMasters } from '@/utils/ActionsJudge'
import React, { useState } from 'react'
import styled from 'styled-components'
import BoardItemHead from '../components/BoardItemHead'
import QuietRoomList from './QuietRoomList'


const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

interface Props {
  /**
   * 版面 ID
   */
  id: number
}

export default ({ id }: Props) => {
  const [listKey, setListKey] = useState(0)
  const [board] = useFetcher(() => getBoardInfo(id), {
    fail: navigateHandler,
  })
  if (board === null) {
    return null
  }

  const myInfo = userModel.state.myInfo
  const canManage = judgeManagerOrBoardMasters(myInfo, board.boardMasters)

  return (
    <WrapperDiv>
      <BoardItemHead title="小黑屋" boardInfo={board} />
      <QuietRoomList
        key={listKey}
        service={(from: number) => getBoardStopPostUser(id, from)}
        boardId={board.id}
        refreshFunc={() => setListKey(listKey + 1)}
        canManage={canManage}
      />
    </WrapperDiv>
  )
}
