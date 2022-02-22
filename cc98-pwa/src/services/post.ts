import { GET, PUT } from '@/utils/fetch'
import { IEnhance, IFace, ILike, IMyPosts, IPost, IReply, ISummary } from '@cc98/api'

/**
 * 获取一个帖子的10层楼
 */
export function getPost(id: number | string, from: number, shareToken?: string) {
  return GET<IPost[]>(`topic/${id}/post`,
    shareToken !== undefined ? {
      params: {
        from,
        size: 10,
        share_token: shareToken
      },
    } :
      {
        params: {
          from,
          size: 10,
        },
      }
  )
}


export function getPostList(data: IReply[]) {
  let id = data.map(x => `id=${x.postId}`).join('&')
  return GET<IPost[]>(`post/basic?${id}`)
}

export async function getPostInfoById(id: number) {
  const res = await GET<IPost[]>(`post/basic`, {
    params: {
      id
    }
  })
  return await Promise.resolve(res.map(postIds => postIds[0]))
}

/**
 * 逆向获取帖子
 */
export async function getReversePost(id: number | string, from: number, total: number) {
  const floor = total + 1
  /**
   * case ex 34L  floor = 34 from = 0
   * 请求 realFrom = 25 size = 10 -> floor = 34 from = 10
   *     realFrom = 15 size = 10 -> floor = 34 from = 20
   *     realFrom = 5 size = 10 -> floor = 34 from = 30
   *     1 < floor - from < 9  realFrom = 0 size = floor - from + 1
   *     floor = from + 1
   * case ex 10L
   *     realFrom = 0 realSize = 10
   *     from = 9 total = 9
   * case
   *     from = 0 total = 10 floor = 11
   *     希望的结果 realFrom = 1
   */
  const realFrom = floor - from - 10 >= 0 ? floor - from - 10 : 0
  let realSize = from !== 0 && from === total ? 0 : 10
  if (floor - from < 9) {
    realSize = floor - from
  }

  const res = await GET<IPost[]>(`topic/${id}/post`, {
    params: {
      from: realFrom,
      size: realSize,
    },
  })
  return await Promise.resolve(res.map(data => data.reverse()))
}

/**
 * 获取一个帖子的单独一层
 */
export async function getSinglePost(topicId: number | string, floor: number) {
  const res = await GET<IPost[]>(`topic/${topicId}/post`, {
    params: {
      from: floor - 1,
      size: 1,
    },
  })
  return await Promise.resolve(res.map(posts => posts[0]))
}

export function getFloor(topicId: number | string, floor: number) {
  return GET<IPost[]>(`topic/${topicId}/post`, {
    params: {
      from: floor - 1,
      size: 1,
    },
  })
}

/**
 * 追踪用户
 */
export function getTracePost(topicid: number | string, postid: number | string, from: number) {
  return GET<IPost[]>('post/topic/specific-user', {
    params: {
      topicid,
      postid,
      from,
      size: 10,
    },
  })
}

/**
 * 获取热评
 */
export function getHotPost(topicId: number | string, shareToken?: string) {
  return GET<IPost[]>(`topic/${topicId}/hot-post`,
    shareToken !== undefined ? {
      params: {
        share_token: shareToken
      }
    } : {}
  )
}

/**
 * 获取赞/踩状态
 */
export function getLikeState(topicId: number) {
  return GET<ILike>(`post/${topicId}/like`)
}

/**
 * 赞
 */
export function putLike(topicId: number) {
  return PUT(`post/${topicId}/like`, {
    params: 1,
  })
}

/**
 * 踩
 */
export function putDislike(topicId: number) {
  return PUT(`post/${topicId}/like`, {
    params: 2,
  })
}

/**
 * 用户评分 +1或-1
 */
export function rate(id: number, value: 1 | -1, reason: string) {
  return PUT(`post/${id}/rating`, {
    params: {
      value,
      reason,
    },
  })
}

/**
 * 获取用户近期发的回复
 */
export async function getMyRecentPosts(from: number) {
  const res = await GET<IMyPosts>('me/recent-post', {
    params: {
      from,
      size: 20,
    },
  })
  return await Promise.resolve(res.map(posts => posts.data))
}
/**
 * 获取用户近期热门回复
 */
export async function getMyHotPosts(from: number) {
  const res = await GET<IMyPosts>('me/hot-post', {
    params: {
      from,
      size: 20,
    },
  })
  return await Promise.resolve(res.map(posts => posts.data))
}
/**
 * 获取人脸
 */
export async function getFaces(url: string) {
  return GET<IFace>('face', {
    params: {
      url
    },
  })
}
/**
 * 获取增强图片
 */
export async function getEnhancedImage(url: string) {
  return GET<IEnhance>('enhance', {
    params: {
      url
    },
  })
}
/**
 * 获取摘要
 */
export async function getPostSummary(id: number | string, shareToken?: string) {
  return GET<ISummary>('summary',
    shareToken !== undefined ? {
      params: {
        id,
        share_token: shareToken
      },
    } : {
      params: {
        id
      },
    }
  )
}