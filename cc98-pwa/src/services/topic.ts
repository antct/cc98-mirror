import { DELETE, GET, PUT } from '@/utils/fetch'
import { IHotTopic, IReply, ITopic, IPost } from '@cc98/api'

/**
 * 根据id获取某个版面的置顶帖子
 */
export async function getTopTopics(id: string) {
  const res = await GET<ITopic[]>('topic/toptopics', {
    params: {
      boardid: id,
    },
  })
  return await Promise.resolve(res.map(topics => topics.reverse()))
}

/**
 * 获取版面内帖子
 * @param id 版面id
 * @param from 起始位置
 * @param size 请求数量
 * @param tag1 默认 -1
 * @param tag2 默认 -1
 */
export async function getTopicsInBoard(id: string, from: number, size: number, tag1 = -1, tag2 = -1) {
  if (tag1 === -1 && tag2 === -1) {
    return GET<ITopic[]>(`board/${id}/topic`, {
      params: {
        from,
        size,
      },
    })
  }

  const params: { [key: string]: string | number } = {}

  if (tag1 !== -1) {
    params.tag1 = tag1
  }
  if (tag2 !== -1) {
    params.tag2 = tag2
  }
  params.from = from
  params.size = size

  interface Topics {
    count: number
    topics: ITopic[]
  }

  const res = await GET<Topics>(`topic/search/board/${id}/tag`, {
    params,
  })
  return await Promise.resolve(res.map(topics => topics.topics))
}

/**
 * 获取帖子基本信息
 */
export function getTopicInfo(id: number | string, shareToken?: string) {
  return GET<ITopic>(`topic/${id}`,
    shareToken !== undefined ? {
      params: {
        share_token: shareToken
      }
    } : {}
  )
}

export function getTopicList(data: IReply[]) {
  let id = data.map(x => `id=${x.topicId}`).join('&')
  return GET<ITopic[]>(`topic/basic?${id}`)
}


export async function getTopicInfoById(id: number) {
  const res = await GET<ITopic[]>(`topic/basic`, {
    params: {
      id
    }
  })
  return await Promise.resolve(res.map(Infos => Infos[0]))
}


/**
 * 获取新帖
 */
export function getNewTopics(from: number) {
  return GET<ITopic[]>('topic/new', {
    params: {
      from,
      size: 20,
    },
  })
}


/**
 * 获取随机推荐
 */
export async function getRandomRecommendedTopics(from: number) {
  interface Topics {
    content: string
    topic: ITopic
  }
  const res = await GET<Topics[]>('topic/random-recommendation', {
    params: {
      size: 20,
    },
  })
  return await Promise.resolve(res.map(topics => topics.map(topic => {
    topic.topic.content = topic.content
    return topic.topic
  })))
}


/**
 * 获取最近随机
 */
export async function getRandomRecentTopics(from: number) {
  const res = await GET<ITopic[]>('topic/random-recent', {
    params: {
      size: 20,
    },
  })
  return await Promise.resolve(res);
}


/**
 * 获取关注版面的帖子
 */
export function getFollowBoardsTopics(from: number) {
  return GET<ITopic[]>('me/custom-board/topic', {
    params: {
      from,
      size: 20,
    },
  })
}

/**
 * 获取关注用户的帖子
 */
export function getFollowUsersTopics(from: number) {
  return GET<ITopic[]>('me/followee/topic', {
    params: {
      from,
      size: 20,
    },
  })
}

/**
 * 获取收藏的帖子
 */
export function getFavoriteTopics(from: number) {
  return GET<ITopic[]>('topic/me/favorite', {
    params: {
      from,
      size: 20,
    },
  })
}


/**
 * 获取收藏的帖子，按最后回复排序
 */
export function getFavoriteTopicsOrderByUpdate(from: number) {
  return GET<ITopic[]>('topic/me/favorite', {
    params: {
      from,
      size: 20,
      order: 1
    },
  })
}

/**
 * 搜索
 */
export function searchTopicContent(keyword: string, from: number, size: number, sort: number) {
  return GET<IPost[]>('es/search', {
    params: {
      keyword: `${keyword}`,
      from,
      size,
      sort
    },
  })
}


/**
 * 搜索
 */
export function searchTopics(keyword: string, from: number) {
  return GET<ITopic[]>('topic/search', {
    params: {
      keyword: `${keyword}`,
      from,
      size: 20,
    },
  })
}

/**
 * 搜索收藏
 */
export function searchFavoriteTopics(keyword: string, from: number) {
  return GET<ITopic[]>('topic/me/search-favorite', {
    params: {
      keyword: `${keyword}`,
      from,
      size: 20,
    },
  })
}

/**
 * 搜索版面主题
 */
export function searchBoardTopics(keyword: string, from: number, boardid: number) {
  return GET<ITopic[]>(`topic/search/board/${boardid}`, {
    params: {
      keyword: `${keyword}`,
      from,
      size: 20,
    },
  })
}

/**
 * 获取热门
 */
export function getHotTopics() {
  return GET<IHotTopic[]>('topic/hot')
}

/**
 * 获取本周热门
 */
export function getWeeklyHotTopics() {
  return GET<ITopic[]>('topic/hot-weekly')
}

/**
 * 获取本月热门
 */
export function getMonthlyHotTopics() {
  return GET<ITopic[]>('topic/hot-monthly')
}

/**
 * 获取历史热门
 */
export function getHistoryHotTopics() {
  return GET<ITopic[]>('topic/hot-history')
}

/**
 * 获取一个用户近期发的帖子
 */
export function getUsersRecentTopics(id: number, from: number) {
  return GET<ITopic[]>(`user/${id}/recent-topic`, {
    params: {
      from,
      size: 20,
    },
  })
}

/**
 * 获取用户近期发的帖子
 */
export function getMyRecentTopics(from: number) {
  return GET<ITopic[]>('me/recent-topic', {
    params: {
      from,
      size: 20,
    },
  })
}

/**
 * 获取帖子是否收藏
 */
export function getTopicFavorite(id: number | string) {
  return GET<boolean>(`topic/${id}/isfavorite`)
}

/**
 * 收藏/取消收藏帖子
 */
export function FavoriteTopic(topicId: number, opt: boolean | null) {
  const url = `me/favorite/${topicId}`
  if (!opt) {
    return PUT(url)
  }

  return DELETE(url)
}

