import { uploadPicture } from '@/services/editor'
import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import React, { useRef } from 'react'
import { EditorModel } from '../EditorModel'


interface Props {
  editor: EditorModel
}

export default ({ editor }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function clickHandler() {
    if (!fileInputRef.current) {
      return
    }

    fileInputRef.current.click()
  }

  async function choosePicFinish(files: FileList | null) {
    if (!files || files.length === 0) return
    for (const file of files) {
      const res = await uploadPicture(file)
      res.fail().succeed(data => {
        if (editor.state.contentType === 0) editor.appendMainContent(`\n[img]${data[0]}[/img]\n`)
        else editor.appendMainContent(`\n\n![](${data[0]})\n\n`)
      })
    }
  }

  return (
    <>
      <IconButton onClick={clickHandler}>
        <AddPhotoAlternateIcon />
      </IconButton>
      <input
        style={{ display: 'none' }}
        type="file"
        name="file"
        onChange={e => choosePicFinish(e.target.files)}
        ref={fileInputRef}
        multiple
        accept="image/*"
      />
    </>
  )
}
