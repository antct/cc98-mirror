import useModel from '@/hooks/useModel'
import React from 'react'
import styled from 'styled-components'
import MainContent from './MainContent'
import ToolBox from './ToolBox'
import { WealthModel } from './WealthModel'


const FixBottomDiv = styled.div`
  left: 8px;
  right: 8px;
  bottom: 12px;
`

export { WealthModel }

interface Props {
  transferer: WealthModel
  onSendCallback: () => void
}

const Transferer: React.FC<Props> = ({ transferer, onSendCallback }) => {
  useModel(transferer)

  return (
    <div>
      <MainContent transferer={transferer} />
      <FixBottomDiv>
        <ToolBox transferer={transferer} onSendCallback={onSendCallback} />
      </FixBottomDiv>
    </div>
  )
}

export default React.memo(Transferer)
