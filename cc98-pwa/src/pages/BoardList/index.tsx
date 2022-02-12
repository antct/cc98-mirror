import SearchInput from '@/components/SearchInput'
import StickyBar from '@/components/StickyBar'
import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import { getBoardsInfo } from '@/services/board'
import { navigateHandler } from '@/services/utils/errorHandler'
import { IBasicBoard } from '@cc98/api'
import { Collapse, IconButton } from '@material-ui/core'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { throttle } from 'lodash-es'
import React, { useState } from 'react'
import styled from 'styled-components'
import BoardGroup, { Title, WrapperDiv } from './BoardGroup'
import BoardItem from './BoardItem'

const SearchDiv = styled.div`
  margin: 24px 10px;
`

const EmptyDiv = styled.div`
  height: 110px;
`

export default () => {
  const { myInfo } = useModel(userModel)
  // 列表搜索，效率不是很高
  const [childBoards, setChildBoards] = useState<IBasicBoard[]>([])
  const [boardList] = useFetcher(getBoardsInfo, {
    success: boards => {
      setChildBoards(
        boards.map(baseBoard => baseBoard.boards).reduce((prev, cur) => cur.concat(prev))
      )
    },
    fail: navigateHandler,
  })

  // 版面搜索
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBoards, setFilteredBoards] = useState<IBasicBoard[]>([])

  const onSearchTermChange = throttle((value: string) => {
    setSearchTerm(value)
    setFilteredBoards(childBoards.filter(board => board.name.indexOf(value) !== -1))
  }, 250)

  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <>
      <StickyBar>
        <SearchInput placeholder="搜索版面" onChange={onSearchTermChange} />
      </StickyBar>
      {searchTerm ? (
        <SearchDiv>
          {filteredBoards.map(board => (
            <BoardItem key={board.id} boardInfo={board} />
          ))}
        </SearchDiv>
      ) : (
        <>
          <WrapperDiv>
            <Title onClick={() => setIsExpanded(!isExpanded)}>
              {'关注'}
              <IconButton color="primary" style={{ marginRight: -4 }}>
                <SwapVertIcon
                  style={{
                    transform: isExpanded ? undefined : 'rotate(90deg)',
                    transition: 'transform 0.5s',
                  }}
                />
              </IconButton>
            </Title>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              {myInfo && myInfo.customBoards.map((value, index) => {
                const board = childBoards.filter(board => board.id === value)[0]
                return (board && <BoardItem key={value} boardInfo={board} hasCover={true} />)
              })}
            </Collapse>
          </WrapperDiv>
          {boardList &&
            boardList.map(boardGroup => <BoardGroup key={boardGroup.id} boardsInfo={boardGroup} />)}
          <EmptyDiv />
        </>
      )}
    </>
  )
}
