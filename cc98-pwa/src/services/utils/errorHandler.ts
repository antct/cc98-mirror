import { FetchError } from '@/utils/fetch'
import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'


export function notificationHandler(err: FetchError) {
  if (err.status === 400) {
    snackbar.error('请求无效')
  } else if (err.status === 401) {
    snackbar.error('您未登陆或没有权限进行此操作')
  } else if (err.status === 403) {
    snackbar.error('您的操作是被禁止的')
  } else if (err.status === 404) {
    snackbar.error('找不到此页面')
  } else if (err.status === 500 || err.status === 502 || err.status === 503) {
    snackbar.error('服务器内部错误')
  } else if (err.status === 510) {
    snackbar.error('校内代理中断')
  }
}


const navigateFix = (url: string) => {
  if (window.location.pathname === url) return
  navigate(url, { replace: true })

}

export function navigateHandler(err: FetchError) {
  if (err.status === 400) {
    navigateFix('/error/400')
  } else if (err.status === 401) {
    navigateFix('/error/401')
  } else if (err.status === 403) {
    navigateFix('/error/403')
  } else if (err.status === 404) {
    navigateFix('/error/404')
  } else if (err.status === 410) {
    navigateFix('/error/410')
  } else if (err.status === 500 || err.status === 502 || err.status === 503) {
    navigateFix('/error/500')
  } else if (err.status === 510) {
    navigateFix('/error/510')
  }
}

export function rateHandler(err: FetchError) {
  if (err.msg === 'cannot_rate_yourself') {
    snackbar.error('您不能给自己评分')
  } else if (err.msg === 'has_rated_tody') {
    snackbar.error('您今天已经评过分了，请明天再来')
  } else if (err.msg === 'you_cannot_rate') {
    snackbar.error('您发帖还不足500，不能评分')
  } else if (err.msg === 'has_rated_this_post') {
    snackbar.error('您已经给这个贴评过分了')
  } else if (err.msg === 'post_user_not_exists') {
    snackbar.error('这个回复的账号已经不存在了')
  }
}

export function loginHandler(err: FetchError) {
  // TODO:
  if (err.status === 400) {
    snackbar.error('账号密码错误')
  } else if (err.status === 403) {
    snackbar.error('您没有登录权限')
  }
  
}

export function manageHandler(err: FetchError) {
  if (err.msg === 'reward_wealth_limited') {
    snackbar.error('您不能给自己评分')
  } else if (err.status === 400) {
    snackbar.error('输入有误')
  } else if (err.status === 401) {
    snackbar.error('您的权限不足')
  } else if (err.status === 500) {
    snackbar.error('服务器内部错误')
  }
}

export function favoriteHandler(err: FetchError) {
  if (err.status === 401) {
    snackbar.error('请先登录')
  } else {
    snackbar.error('操作失败')
  }
}
