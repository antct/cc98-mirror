import useFetcher from '@/hooks/useFetcher'
import { getBoardEvent, getBoardInfo } from '@/services/board'
import { navigateHandler } from '@/services/utils/errorHandler'
import React from 'react'
import styled from 'styled-components'
import BoardItemHead from '../components/BoardItemHead'
import RecordList from './BoardRecordList'


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
  id: string
}

export default ({ id }: Props) => {
  const [board] = useFetcher(() => getBoardInfo(id), {
    fail: navigateHandler,
  })

  if (board === null) {
    return null
  }

  return (
    <WrapperDiv>
      <BoardItemHead title="版面事件" boardInfo={board} />
      <RecordList service={(from: number) => getBoardEvent(id, from)} />
    </WrapperDiv>
  )
}
