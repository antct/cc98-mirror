import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IBoardEvent } from '@cc98/api'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary, 
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'


const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ExpansionPanelS = muiStyled(ExpansionPanel)({
  width: '100%',
})

interface Props {
  /**
   * 事件信息
   */
  eventInfo: IBoardEvent
}

export default ({ eventInfo }: Props) => (
  <FlexDiv>
    <ExpansionPanelS>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <FlexDiv>
          <Typography onClick={() => navigate(`/topic/${eventInfo.topicId}`)}>{eventInfo.content}</Typography>
          <Typography>操作人：{eventInfo.operatorUserName}</Typography>
        </FlexDiv>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FlexDiv>
          <Typography>
            对象：
            {eventInfo.boardId === 182 ? '匿名用户' : eventInfo.targetUserName}
          </Typography>
          <Typography>时间：{dayjs(eventInfo.time).format('YYYY/MM/DD HH:mm')}</Typography>
        </FlexDiv>
      </ExpansionPanelDetails>
    </ExpansionPanelS>
  </FlexDiv>
)
