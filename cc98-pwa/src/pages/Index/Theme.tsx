import { CDN, PC_WIDTH } from '@/config'
import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { getTheme } from '@/services/global'
import { notificationHandler } from '@/services/utils/errorHandler'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const WrapperDiv = styled.div`
  margin: 8px 16px;
  background-size:100% 100%;
  width: calc(100% - 32px);
  height: 70px;
`

interface Props {
}

export default ({ }: Props) => {

  const [theme] = useFetcher(() => getTheme(), {
    fail: notificationHandler,
  })
  const { showTheme, useCDN } = useModel(settingModel, ['showTheme', 'useCDN'])
  const { TOGGLE_THEME } = settingModel

  return (
    <>
      <ListItem button onClick={TOGGLE_THEME}>
        <ListItemIcon>
          {
            showTheme ? (<VolumeUpIcon />) : (<VolumeOffIcon />)
          }
        </ListItemIcon>
        <ListItemText primary="全站背景" />
      </ListItem>
      <Divider />
      {
        showTheme &&
        (
          <>
            {
              !!theme ?
                <>
                  {/* <WrapperDiv style={{ backgroundImage: useCDN ? CDN(`url("${theme?.url}`, false) : `url("${theme?.url}?width=${PC_WIDTH}")` }} /> */}
                  <WrapperDiv style={{ backgroundImage: `url("${theme?.url}?width=${PC_WIDTH}")` }} />
                  <Divider />
                </>
                :
                <>
                  <WrapperDiv style={{ backgroundColor: '#e2e2e2' }} />
                  <Divider />
                </>
            }

          </>
        )
      }
    </>
  )
}
