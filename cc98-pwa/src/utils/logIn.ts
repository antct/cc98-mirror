import host from '@/config/host'
import { navigateHandler } from '@/services/utils/errorHandler'
import snackbar from '@/utils/snackbar'
import AwaitLock from 'await-lock'
import { encodeParams, FetchError } from './fetch'
import { Failure, Success, Try } from './fp/Try'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from './storage'

let lock = new AwaitLock();

/**
 * 访问令牌
 */
export interface Token {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

/**
 * 从本地取得 access_token，如果过期尝试刷新
 */
export async function getAccessToken(): Promise<string> {
  await lock.acquireAsync();
  try {
    let accessToken = getLocalStorage('access_token')

    if (!accessToken) {
      const refreshToken = getLocalStorage('refresh_token') as string
      const accessType = getLocalStorage('access_type') as string

      if (!refreshToken) {
        if (window.location.search.indexOf('token') === -1) snackbar.error('登录凭证失效，请重新登录')
        return ''
      }

      const token = await getTokenByRefreshToken(refreshToken, accessType)
      token
        .fail(err => navigateHandler(err))
        .succeed(token => {
          const access_token = `${token.token_type} ${token.access_token}`
          setLocalStorage('access_token', access_token, token.expires_in)
          // refresh_token 有效期一个月
          setLocalStorage('refresh_token', token.refresh_token, 2592000)
          setLocalStorage('access_type', accessType, 2592000)
          accessToken = access_token
        })
    }

    return accessToken as string
  } finally {
    lock.release();
  }
}

/**
 * 使用refresh_token获取token
 */
async function getTokenByRefreshToken(refreshToken: string, accessType: string) {
  const requestBody = {
    client_id: accessType === 'authorization' ? '9390a1f2-9348-4b18-2e9f-08d9db5a8c00' : '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
    client_secret: accessType === 'authorization' ? '3065abdb-8c4f-486c-b677-4537ddc67297' : '8b53f727-08e2-4509-8857-e34bf92b27f2',
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }
  try {
    const response = await fetch(host.oauth, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: encodeParams(requestBody),
    })
    if (!(response.ok && response.status === 200)) {
      return Try.of<Token, FetchError>(
        Failure.of({
          status: response.status,
          msg: await response.text(),
          response,
        })
      )
    }
    return Try.of<Token, FetchError>(Success.of(await response.json()))
  } catch {
    return Try.of<Token, FetchError>(
      Failure.of({
        status: 500,
        msg: ''
      })
    )
  }
}

/**
 * 登录
 */
export async function logIn(username: string, password: string) {
  /**
   * 请求的正文部分
   * 密码模式需要 5个参数
   * 其中 client_id 和 client_secret 来自申请的应用，grant_type 值为 "password"
   */
  const requestBody = {
    client_id: '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
    client_secret: '8b53f727-08e2-4509-8857-e34bf92b27f2',
    grant_type: 'password',
    username,
    password,
    scope: 'cc98-api openid offline_access',
  }

  try {
    const response = await fetch(host.oauth, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: encodeParams(requestBody),
    })

    if (!(response.ok && response.status === 200)) {
      return Try.of<Token, FetchError>(
        Failure.of({
          status: response.status,
          msg: await response.text(),
          response,
        })
      ).fail(err => navigateHandler(err))
    }

    const token = await response.json()

    const access_token = `${token.token_type} ${token.access_token}`
    setLocalStorage('access_token', access_token, token.expires_in)
    // refresh_token 有效期一个月
    setLocalStorage('refresh_token', token.refresh_token, 2592000)
    setLocalStorage('access_type', 'password', 2592000)

    return Try.of<Token, FetchError>(Success.of(token))
  } catch {
    return Try.of<Token, FetchError>(
      Failure.of({
        status: 500,
        msg: ''
      })
    )
  }
}

/**
 * 登出
 */
export function logOut() {
  removeLocalStorage('access_token')
  removeLocalStorage('access_type')
  removeLocalStorage('refresh_token')
}

/**
 * 判断是否登录
 */
export function isLogIn() {
  return !!getLocalStorage('refresh_token') && !!getLocalStorage('access_type')
}
