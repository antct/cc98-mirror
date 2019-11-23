import { useState, useEffect } from 'react'

import { Try } from '@/utils/fp/Try'
import { FetchError } from '@/utils/fetch'

export type Service<T> = (from: number) => Promise<Try<T, FetchError>>

interface InfListState {
  isLoading: boolean
  isEnd: boolean
  from: number
}

interface Options<T> {
  /**
   * 初始 from，默认 0
   */
  initFrom?: number
  /**
   * 步长，默认 20
   */
  step?: number
  /**
   * Try fail callback
   */
  fail?: (err: FetchError) => void
  /**
   * Try success callback
   */
  success?: (data: T[]) => void
}

export function useInfListFix<T>(service: Service<T[]>, options: Options<T> = {}) {
  const [state, setState] = useState<InfListState>({
    isLoading: false,
    isEnd: false,
    from: (options && options.initFrom) || 0,
  })

  const [list, setList] = useState<T[]>([])
  const [deltaList, setDeltaList] = useState<T[]>([])

  function callback() {
    setState({
      ...state,
      isLoading: true,
    })

    service(state.from).then(res => {
      res
        .fail(err => {
          options.fail && options.fail(err)
        })
        .succeed(list => {
          setDeltaList(list)
          setList(prevList => prevList.concat(list))
          options.success && options.success(list)
        })
    })
  }

  function loaded() {
    setState(prevState => ({
      isLoading: false,
      isEnd: deltaList.length !== (options.step || 20),
      from: prevState.from + deltaList.length,
    }))
  }

  useEffect(() => {
    callback()
  }, [])

  return [list, state, callback, loaded] as [typeof list, typeof state, typeof callback, typeof loaded]
}

export default function useInfList<T>(service: Service<T[]>, options: Options<T> = {}) {
  const [state, setState] = useState<InfListState>({
    isLoading: false,
    isEnd: false,
    from: (options && options.initFrom) || 0,
  })

  const [list, setList] = useState<T[]>([])

  function callback() {
    setState({
      ...state,
      isLoading: true,
    })

    service(state.from).then(res => {
      res
        .fail(err => {
          options.fail && options.fail(err)
        })
        .succeed(list => {
          setList(prevList => prevList.concat(list))

          setState({
            isLoading: false,
            isEnd: list.length !== (options.step || 20),
            from: state.from += list.length,
          })

          options.success && options.success(list)
        })
    })
  }

  useEffect(() => {
    callback()
  }, [])

  return [list, state, callback] as [typeof list, typeof state, typeof callback]
}
