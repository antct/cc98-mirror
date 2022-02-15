import { MAX_WIDTH } from '@/config'
import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getTheme } from '@/services/global'
import { notificationHandler } from '@/services/utils/errorHandler'
import { Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
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
  const { showTheme } = useModel(settingModel, ['showTheme'])
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
                  <WrapperDiv style={{ backgroundImage: `url("${theme?.url}?width=${MAX_WIDTH}")` }}>
                  </WrapperDiv>
                  <Divider />
                </>
                :
                <>
                  <WrapperDiv style={{ backgroundColor: '#e2e2e2' }}>
                    {/* <LoadingCircle /> */}
                  </WrapperDiv>
                  <Divider />
                </>
            }

          </>
        )
      }
    </>
  )
}
