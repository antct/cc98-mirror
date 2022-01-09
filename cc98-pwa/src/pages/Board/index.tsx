import FixFab from '@/components/FixFab'
import { FinTopicList, InfTopicList } from '@/components/TopicList'
import useFetcher from '@/hooks/useFetcher'
import { getBoardInfo } from '@/services/board'
import { getTopicsInBoard, getTopTopics } from '@/services/topic'
import { navigateHandler } from '@/services/utils/errorHandler'
import { navigate } from '@/utils/history'
import EditIcon from '@material-ui/icons/Edit'
import React, { useState } from 'react'
import styled from 'styled-components'
import BoardHead from './BoardHead'


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

  // const [boardTags] = useFetcher(() => getBoardTags(id))
  const [tagIDs, setTagIDs] = useState<[number, number]>([-1, -1])

  const onTagChange = (tagID: number, index: number) => {
    if (index === 0) {
      setTagIDs([tagID, tagIDs[1]])
    } else {
      setTagIDs([tagIDs[0], tagID])
    }
  }

  return (
    <WrapperDiv>
      {board && (
        <>
          <BoardHead data={board} />
          <FixFab onClick={() => navigate(`/editor/postTopic/${board.id}`)}>
            <EditIcon />
          </FixFab>
        </>
      )}

      {/* <BoardTags boardTags={boardTags} onChange={onTagChange} /> */}

      <FinTopicList service={() => getTopTopics(id)} place="inboard" noLoading />

      <InfTopicList
        key={`${tagIDs[0]}-${tagIDs[1]}`}
        service={(from: number) => getTopicsInBoard(id, from, 20, tagIDs[0], tagIDs[1])}
        place="inboard"
      />
    </WrapperDiv>
  )
}
