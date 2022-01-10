import UBB from '@/UBB'
import { IUser } from '@cc98/api'
import React, { useState } from 'react'
import styled from 'styled-components'
import ExpandPanel from './ExpandPanel'


const UBBDiv = styled.div`
  width: 100%;
  margin: 0 20px;
`

interface Props {
  info: IUser
}

const UserSignature: React.FC<Props> = ({ info }) => {
  const [expand, setExpand] = useState(false)
  const onChange = () => {
    setExpand(!expand)
  }

  return (
    <ExpandPanel expanded={expand} title="介绍" onChange={onChange}>
      {expand && (
        <UBBDiv>
          <UBB ubbText={info.introduction || "这家伙很懒，什么都没留下。"} />
        </UBBDiv>
      )}
    </ExpandPanel>
  )
}
export default UserSignature