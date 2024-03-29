import UBB from '@/UBB'
import { Badge } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import React from 'react'
import styled from 'styled-components'
import { EditorModel } from './EditorModel'


const WrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`

const AttachDiv = styled.div`
  margin: 10px;
  max-width: 80px;
  max-height: 80px;
`

interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => (
  <WrapperDiv>
    {editor.state.attachments.map((attach, index) => (
      <AttachDiv key={index}>
        <Badge
          color="secondary"
          badgeContent={<ClearIcon style={{ fontSize: 13 }} />}
          onClick={() => editor.detachAttachment(index)}
        >
          <UBB ubbText={attach} />
        </Badge>
      </AttachDiv>
    ))}
  </WrapperDiv>
)
