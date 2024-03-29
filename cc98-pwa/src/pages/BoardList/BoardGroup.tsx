import muiStyled from '@/muiStyled'
import { IBoardGroup } from '@cc98/api'
import { Collapse, IconButton, Typography } from '@mui/material'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import BoardItem from './BoardItem'
import { NOT_EXPANDED_BOARDS } from './constants'


export const WrapperDiv = styled.div`
  margin: 8px 8px;
`

export const Title = muiStyled(Typography).attrs({
  variant: 'subtitle1',
  color: 'primary',
})({
  margin: '0 6px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

interface Props {
  boardsInfo: IBoardGroup
}

export default ({ boardsInfo }: Props) => {
  const hasCover = useMemo(() => {
    return NOT_EXPANDED_BOARDS.indexOf(boardsInfo.id) === -1
  }, [boardsInfo.id])
  const [isExpanded, setIsExpanded] = useState(hasCover)

  return (
    <WrapperDiv>
      <Title onClick={() => setIsExpanded(!isExpanded)}>
        {boardsInfo.name}
        <IconButton color="primary" style={{ marginRight: -4 }} size="large">
          <SwapVertIcon
            style={{
              transform: isExpanded ? undefined : 'rotate(90deg)',
              transition: 'transform 0.5s',
            }}
          />
        </IconButton>
      </Title>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {boardsInfo.boards.map(board => (
          <BoardItem key={board.id} boardInfo={board} hasCover={hasCover} />
        ))}
      </Collapse>
    </WrapperDiv>
  );
}
