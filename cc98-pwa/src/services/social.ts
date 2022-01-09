import { GET } from '@/utils/fetch'

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
