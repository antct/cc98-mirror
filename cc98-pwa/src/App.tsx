import BackGround from '@/components/BackGround'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import DrawerMenu from '@/modules/DrawerMenu'
import TopBar from '@/modules/TopBar'
import Router from '@/router'
import { getTheme } from '@/theme'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import { AuthProvider } from "react-oidc-context"

const App = () => (
  <BackGround>
    <TopBar />
    <DrawerMenu />
    <Router />
  </BackGround>
)

const oidcConfig = {
  authority: "https://openid.cc98.org",
  client_id: "9390a1f2-9348-4b18-2e9f-08d9db5a8c00",
  redirect_uri: `${window.location.origin}/`,
  response_type: 'code',
  scope: 'openid offline_access cc98-api'
}

const Root = () => {
  const { theme, mode } = useModel(settingModel, ['theme', 'mode'])

  return (
    <ThemeProvider theme={getTheme(theme, mode)}>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default Root
