import React from 'react'
import styled from 'styled-components'
import { EditorModel } from '../EditorModel'
import ClearBtn from './ClearBtn'
import MarkdownBtn from './MarkdownBtn'
import PictureBtn from './PictureBtn'
import PreviewBtn from './PreviewBtn'
import SendBtn from './SendBtn'
import StickerBtn from './StickerBtn'


const WrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const WrapperToolBox = styled.div`
  display: flex;
  flex-direction: column;
`
interface Props {
  editor: EditorModel
  onSendCallback: () => void
}

export default ({ editor, onSendCallback }: Props) => (
  <WrapperToolBox>
    <WrapperDiv>
      <div>
        <PictureBtn editor={editor} />
        <StickerBtn editor={editor} />
        <ClearBtn editor={editor} />
      </div>
      <div>
        <MarkdownBtn editor={editor} />
        <PreviewBtn editor={editor} />
        <SendBtn editor={editor} onSendCallback={onSendCallback} />
      </div>
    </WrapperDiv>
  </WrapperToolBox>
)
