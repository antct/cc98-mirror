import { GET, POST } from '@/utils/fetch'
import { IUser } from '@cc98/api'

export function getFollower(from: number) {
  return GET<number[]>('me/follower', {
    params: {
      from,
      size: 20,
    },
  })
}

export function getFollowee(from: number) {
  return GET<number[]>('me/followee', {
    params: {
      from,
      size: 20,
    },
  })
}
