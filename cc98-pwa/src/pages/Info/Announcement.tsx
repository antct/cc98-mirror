import React from 'react'
import styled from 'styled-components'

import { ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import UBB from '@/UBB'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

const WrapperDiv = styled.div`
  margin: 8px 16px;
`

interface Props {
  content: string
}


export default ({ content }: Props) => {
  const { showAnnouncement } = useModel(settingModel, ['showAnnouncement'])
  const { TOGGLE_ANNOUNCEMENT } = settingModel
  
  return (
    <>
      <ListItem>
        <ListItemIcon onClick={TOGGLE_ANNOUNCEMENT}>
          {
            showAnnouncement ? (<VolumeUpIcon />) : (<VolumeOffIcon />)
          }
        </ListItemIcon>
        <ListItemText primary="全站公告" />
      </ListItem>
      <Divider />
      {
      showAnnouncement && 
        (
          <>
          <WrapperDiv>
            <UBB ubbText={content} />
          </WrapperDiv>
          <Divider />
          </>
        )
      }
    </>
  )
}
