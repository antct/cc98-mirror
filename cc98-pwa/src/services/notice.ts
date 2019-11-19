import { GET, POST } from '@/utils/fetch'
import { ISystem, IReply } from '@cc98/api'

export function getSystem(from: number) {
  return GET<ISystem[]>('notification/system', {
    params: {
      from,
      size: 20,
    },
  })
}

export function getReply(from: number) {
  return GET<IReply[]>('notification/reply', {
    params: {
      from,
      size: 20,
    },
  })
}


export function getAt(from: number) {
  return GET<IReply[]>('notification/at', {
    params: {
      from,
      size: 20,
    },
  })
}