import useModel from '@/hooks/useModel'
import React from 'react'
import styled from 'styled-components'
import Attachments from './Attachments'
import { EditorModel } from './EditorModel'
import MainContent from './MainContent'
import ToolBox from './ToolBox'


const FixBottomDiv = styled.div`
  left: 8px;
  right: 8px;
  bottom: 12px;
`

export { EditorModel }

interface Props {
  editor: EditorModel
  onSendCallback: () => void
}

const Editor: React.FC<Props> = ({ editor, onSendCallback }) => {
  useModel(editor)

  return (
    <div>
      <MainContent editor={editor} />
      {/* <Attachments editor={editor} /> */}
      <FixBottomDiv>
        <ToolBox editor={editor} onSendCallback={onSendCallback} />
      </FixBottomDiv>
    </div>
  )
}

export default React.memo(Editor)
