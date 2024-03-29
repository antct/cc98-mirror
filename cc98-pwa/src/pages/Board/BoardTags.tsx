import { ITagGroup } from '@cc98/api'
import { MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'


const WrapperDiv = styled.div`
  margin-left: 24px;
`

interface SelectProps {
  tagGroup: ITagGroup
  onChange: (tagID: number) => void
}

const TagSelect: React.FC<SelectProps> = ({ tagGroup, onChange }) => {
  const [tag, setTag] = useState(-1)

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = parseInt(event.target.value, 10)
    setTag(tag)
    onChange(tag)
  }

  return (
    <WrapperDiv>
      <Select value={tag} onChange={selectChange}>
        <MenuItem key={0} value={-1}>
          全部
        </MenuItem>
        {tagGroup.tags.map(t => (
          <MenuItem key={t.id} value={t.id}>
            {t.name}
          </MenuItem>
        ))}
      </Select>
    </WrapperDiv>
  )
}

const FlexDiv = styled.div`
  display: flex;
  align-self: flex-start;
  margin-top: 8px;
`

interface Props {
  boardTags: ITagGroup[] | null
  onChange: (tagID: number, index: number) => void
}

const Tags: React.FC<Props> = ({ boardTags, onChange }) => (
  <FlexDiv>
    {boardTags &&
      boardTags.map((tagGroup, index) => (
        <TagSelect
          key={index}
          tagGroup={tagGroup}
          onChange={(tagID: number) => onChange(tagID, index)}
        />
      ))}
  </FlexDiv>
)

export default Tags
