import muiStyled from '@/muiStyled'
import { customBoard } from '@/services/board'
import { IBoard } from '@cc98/api'
import {
  CircularProgress, Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton, Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React, { useState } from 'react'
import styled from 'styled-components'
import BoardMenu from './components/BoardMenu'


interface Props {
  data: IBoard
}

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0px 10px 16px;
`

const AccordionS = muiStyled(Accordion)({
  width: '100%',
  border: 'none',
  boxShadow: `
    0px 2px 1px -1px rgba(0,0,0,0.12)
  `,
})

const AccordionSummaryS = muiStyled(AccordionSummary)({
  paddingRight: 12
})


export default ({ data }: Props) => {
  const [state, setState] = useState({
    isFollowed: data.isUserCustomBoard,
    loading: false,
  })
  const { isFollowed, loading } = state

  async function handleClick() {
    if (loading) {
      return
    }

    setState({
      ...state,
      loading: true,
    })

    const res = await customBoard(data.id, isFollowed ? 0 : 1)
    res
      .fail(() => setState({ ...state, loading: false }))
      .succeed(_ =>
        setState({
          isFollowed: !isFollowed,
          loading: false,
        })
      )
  }

  return (
    <FlexDiv>
      <HeaderDiv>
        <div>
          <Typography variant="h5" color="primary">
            {data.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {`${data.todayCount} / ${data.topicCount}`}
          </Typography>
        </div>
        <div>
          <IconButton onClick={handleClick} size="large">
            {state.loading ? (
              <CircularProgress size={20} />
            ) : (
              <FavoriteIcon color={isFollowed ? 'secondary' : 'disabled'} />
            )}
          </IconButton>
          <BoardMenu boardId={data.id} />
        </div>
      </HeaderDiv>

      <AccordionS>
        <AccordionSummaryS expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" color="primary">
            版面描述
          </Typography>
        </AccordionSummaryS>
        <AccordionDetails>
          <Typography variant="body2">{data.description}</Typography>
        </AccordionDetails>
      </AccordionS>
    </FlexDiv>
  );
}
