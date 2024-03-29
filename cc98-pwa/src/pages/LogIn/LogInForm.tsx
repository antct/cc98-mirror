import snowball from '@/assets/snowball.png'
import LoadingCircle from '@/components/LoadingCircle'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { loginHandler } from '@/services/utils/errorHandler'
import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { setLocalStorage } from '@/utils/storage'
import {
  Button,
  CircularProgress, TextField
} from '@mui/material'
import React, { useState } from 'react'
import { useAuth } from "react-oidc-context"
import styled from 'styled-components'


const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SnowballImg = styled.img`
  width: 100px;
  margin-bottom: 30px;
`

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 105px;
`

const LogInButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 35,
})

const VisitorButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 20,
})

const ButtonProgress = muiStyled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})({
  marginLeft: 15,
})

interface FormField {
  username: string
  password: string
}

interface LogInState {
  loading: boolean
  logInFail: boolean
}

const LogIn: React.FC = () => {
  // oidc login
  const auth = useAuth()
  if (auth.isAuthenticated) {
    userModel.LOG_IN_OIDC()
    const access_token = `${auth.user?.token_type} ${auth.user?.access_token}`
    setLocalStorage('access_token', access_token, auth.user?.expires_in)
    setLocalStorage('refresh_token', `${auth.user?.refresh_token}`, 2592000)
    setLocalStorage('access_type', 'authorization', 2592000)
    if (window.location.pathname !== '/') navigate('/')
    return null
  }

  const [formField, setFormField] = useState<FormField>({
    username: '',
    password: '',
  })

  const [logInState, setLogInState] = useState<LogInState>({
    loading: false,
    logInFail: false,
  })

  const [authInState, setAuthInState] = useState<LogInState>({
    loading: false,
    logInFail: false,
  })

  const handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormField({
      ...formField,
      [field]: event.target.value,
    })
  }

  const logIn = async () => {
    const { username, password } = formField

    if (username === '' || password === '') {
      snackbar.error('请输入账号或密码')
      return
    }

    setLogInState({
      loading: true,
      logInFail: false,
    })

    const token = await userModel.LOG_IN(username, password)

    token
      .fail(err => {
        setTimeout(() => {
          setLogInState({
            loading: false,
            logInFail: true,
          })
        }, 1000)

        loginHandler(err)
      })
      .succeed(_ => {
        setTimeout(() => {
          setLogInState({
            loading: false,
            logInFail: false,
          })
          if (window.location.pathname !== '/') navigate('/')
        }, 1000)
      })
  }

  // const { logInFail, loading } = logInState

  return (
    <WrapperDiv>
      <SnowballImg src={snowball} />

      <FormDiv>
        <TextField
          fullWidth
          label="用户名"
          variant="standard"
          value={formField.username}
          onChange={handleChange('username')}
        />
        <TextField
          fullWidth
          type='password'
          label="密码"
          variant="standard"
          value={formField.password}
          onChange={handleChange('password')}
        />
      </FormDiv>

      <LogInButton disabled={logInState.loading} onClick={logIn}>
        {logInState.logInFail ? '重试' : '登录'}
        {logInState.loading && <ButtonProgress />}
      </LogInButton>
      <VisitorButton onClick={() => navigate('/hotTopics')}>
        我是游客
      </VisitorButton>
      <VisitorButton disabled={authInState.loading} onClick={() => {
        auth.signinRedirect()
        setAuthInState({
          loading: true,
          logInFail: false,
        })
      }}>
        CC98内网授权
        {authInState.loading && <ButtonProgress />}
      </VisitorButton>
    </WrapperDiv>
  )
}

export default LogIn
