import FixFab from '@/components/FixFab'
import SearchInput from '@/components/SearchInput'
import StickyBar from '@/components/StickyBar'
import { FinTopicList, InfTopicList } from '@/components/TopicList'
import useFetcher from '@/hooks/useFetcher'
import { getBoardInfo } from '@/services/board'
import { getTopicsInBoard, getTopTopics } from '@/services/topic'
import { navigateHandler } from '@/services/utils/errorHandler'
import { navigate } from '@/utils/history'
import EditIcon from '@mui/icons-material/Edit'
import { throttle } from 'lodash-es'
import React, { useState } from 'react'
import styled from 'styled-components'
import BoardHead from './BoardHead'
import { searchBoardTopics } from '@/services/topic'

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

  // 版面搜索
  const [searchTerm, setSearchTerm] = useState('')
  const onSearch = throttle((value: string) => {
    setSearchTerm(value)
  }, 1000 * 10)

  return (
    <WrapperDiv>
      <StickyBar>
        <SearchInput placeholder="版面搜索" onSearch={onSearch} />
      </StickyBar>
      <>
        {board && (
          <>
            <BoardHead data={board} />
            <FixFab onClick={() => navigate(`/editor/postTopic/${board.id}`)}>
              <EditIcon />
            </FixFab>
          </>
        )}
      </>
      {
        searchTerm ?
          <>
            {board && (
              <InfTopicList
                key={searchTerm}
                service={(from: number) => searchBoardTopics(searchTerm, from, board.id)}
                place="inboard"
              />
            )}
          </>
          :
          <>
            {/* <BoardTags boardTags={boardTags} onChange={onTagChange} /> */}

            <FinTopicList service={() => getTopTopics(id)} place="inboard" noLoading />

            <InfTopicList
              key={`${tagIDs[0]}-${tagIDs[1]}`}
              service={(from: number) => getTopicsInBoard(id, from, 20, tagIDs[0], tagIDs[1])}
              place="inboard"
            />
          </>
      }
    </WrapperDiv>
  )
}
