import BackGround from '@/components/BackGround'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import DrawerMenu from '@/modules/DrawerMenu'
import TopBar from '@/modules/TopBar'
import Router from '@/router'
import { getTheme } from '@/theme'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'


const App = () => (
  <BackGround>
    <TopBar />
    <DrawerMenu />
    <Router />
  </BackGround>
)

const Root = () => {
  const { theme, mode } = useModel(settingModel, ['theme', 'mode'])

  return (
    <ThemeProvider theme={getTheme(theme, mode)}>
      <App />
    </ThemeProvider>
  )
}

export default Root
