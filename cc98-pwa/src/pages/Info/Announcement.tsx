import React from 'react'
import styled from 'styled-components'

import { ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import UBB from '@/UBB'

const WrapperDiv = styled.div`
  margin: 8px 16px;
`

interface Props {
  content: string
}

export default ({ content }: Props) => (
  <>
    <ListItem>
      <ListItemIcon>
        <VolumeUpIcon />
      </ListItemIcon>
      <ListItemText primary="全站公告" />
    </ListItem>
    <Divider />
    <WrapperDiv>
      <UBB ubbText={content} />
    </WrapperDiv>
    <Divider />
  </>
)
