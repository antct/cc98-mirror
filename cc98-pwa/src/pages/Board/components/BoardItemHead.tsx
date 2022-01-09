import StickyHeadBar from '@/components/StickyBar/StickyHeadBar'
import { navigate } from '@/utils/history'
import { IBoard } from '@cc98/api'
import React from 'react'


interface Props {
  title: string
  boardInfo: IBoard
}

const RecordHead: React.FC<Props> = ({ title, boardInfo }) => (
  <StickyHeadBar
    title={title}
    subTitle={boardInfo.name}
    subTitleClick={() => navigate(`/board/${boardInfo.id}`)}
  />
)

export default RecordHead
