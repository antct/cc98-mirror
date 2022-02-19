import BackGround from '@/components/BackGround'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import DrawerMenu from '@/modules/DrawerMenu'
import TopBar from '@/modules/TopBar'
import MobileMenu from '@/modules/MobileMenu'
import PCMenu from '@/modules/PCMenu'
import Router from '@/router'
import { getTheme } from '@/theme'
import { StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { AuthProvider } from "react-oidc-context"
import { IS_PC } from './config'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme { }
}


const App = () => (
  <BackGround>
    {!IS_PC ?
      <MobileMenu>
        <Router />
      </MobileMenu>
      :
      <PCMenu>
        <Router />
      </PCMenu>
    }
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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={getTheme(theme, mode)}>
        <AuthProvider {...oidcConfig}>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Root
