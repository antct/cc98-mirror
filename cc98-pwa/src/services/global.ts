import { GET, POST } from '@/utils/fetch'
import { IConfig, IShare, ISignIn, ISite, ITheme, IProxy, ICount } from '@cc98/api'

/**
 * 获取全站基本信息
 */
export function getSiteInfo() {
  return GET<ISite>('config/global')
}

/**
 * 获取全站主页信息
 */
export function getHomeInfo() {
  return GET<IConfig>('config/index')
}

/**
 * 获取全站日活信息
 */
export function getDailyCountInfo(from: number, size: number) {
  return GET<ICount>(`config/daily-data?from=${from}&size=${size}`)
}


/**
 * 获取全站月活信息
 */
export function getMonthlyCountInfo(from: number, size: number) {
  return GET<ICount>(`config/monthly-data?from=${from}&size=${size}`)
}


/**
 * 获取签到信息
 */
export function getSignState() {
  return GET<ISignIn>('me/signin')
}

export function getShareToken(id: number, short: string) {
  return GET<IShare>(`share?id=${id}&short=${short}`)
}


/**
 * 签到
 */
export function signIn() {
  return POST<string>('me/signin')
}


/**
 * 获取全站背景
 */
export function getTheme() {
  return GET<ITheme>('theme')
}

/**
 * 获取当前代理
 */
export function getProxy() {
  return GET<IProxy>('proxy')
}

