import React from 'react'
import styled from 'styled-components'

import { WealthModel } from '../WealthModel'

import SendBtn from './SendBtn'

const WrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const WrapperToolBox = styled.div`
  display: flex;
  flex-direction: column;
`
interface Props {
  transferer: WealthModel
  onSendCallback: () => void
}

export default ({ transferer, onSendCallback }: Props) => (
  <WrapperToolBox>
    <WrapperDiv>
      <div>
      </div>
      <div>
        <SendBtn transferer={transferer} onSendCallback={onSendCallback} />
      </div>
    </WrapperDiv>
  </WrapperToolBox>
)
