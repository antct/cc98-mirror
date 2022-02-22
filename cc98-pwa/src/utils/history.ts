import { routerModel } from '@/router'
import { navigate as reachNavigate, NavigateOptions } from '@reach/router'

/**
 * 路由跳转到对应 URL
 * @param url
 * @param options
 */
export function navigate(url: string, options?: NavigateOptions<{}>) {
  if (options && options.replace) {
    routerModel.POP()
  }

  reachNavigate(url, options)
}

export function go(delta?: number | undefined) {
  window.history.go(delta)
}

export function push(url: string) {
  window.history.pushState({}, '', url)
}

/**
 * 路由回退
 */
export function goback() {
  // if (forceRefresh) {
  //   // ROUTER_CACHE
  // }

  window.history.back()
}

export default {
  navigate,
  go,
  back: goback,
  push
}
