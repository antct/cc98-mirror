import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import UBB from '@/UBB'
import { Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import React from 'react'
import styled from 'styled-components'

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
      <ListItem button onClick={TOGGLE_ANNOUNCEMENT}>
        <ListItemIcon>
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
