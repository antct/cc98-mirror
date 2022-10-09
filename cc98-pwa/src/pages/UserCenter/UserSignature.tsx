import UBB from '@/UBB'
import { IUser } from '@cc98/api'
import React, { useState } from 'react'
import styled from 'styled-components'
import ExpandPanel from './ExpandPanel'
import { PhotoProvider, PhotoView } from 'react-photo-view'


const UBBDiv = styled.div`
  width: 100%;
  margin: 0 16px;
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
    <ExpandPanel expanded={expand} title="签名档" onChange={onChange}>
      {expand && (
        <PhotoProvider>
          <UBBDiv>
            <UBB ubbText={info.signatureCode || "这家伙很懒，什么都没留下。"} />
          </UBBDiv>
        </PhotoProvider>
      )}
    </ExpandPanel>
  )
}
export default UserSignature
