import { VoteInfo } from '@/pages/Editor/MetaInfo/MetaInfoModel'
import { GET, POST, PUT } from '@/utils/fetch'
import { IPost } from '@cc98/api'


/**
 * 获取帖子内容
 */
export async function getOriginalPost(postId: number | string) {
  return GET<IPost>(`post/${postId}/original`)
}

/**
 * 上传图片
 */
export async function uploadPicture(file: File) {
  const formData = new FormData()
  formData.append('files', file, file.name)

  return POST<string>('file', {
    headers: {
      // Content-Type 置空
    },
    requestInit: {
      body: formData,
    },
  })
}

export interface IPostParams {
  /**
   * 标题
   */
  title: string
  /**
   * 回帖内容
   */
  content: string
  /**
   * 回帖格式
   */
  contentType: 0 | 1
  /**
   * 匿名回帖
   */
  isAnonymous?: boolean
}

export interface ITopicParams extends IPostParams {
  /**
   * 帖子类型
   */
  type: number
  /**
   * tags
   */
  tag1?: number
  tag2?: number
  isVote?: boolean
  voteInfo?: VoteInfo
}

/**
 * 发帖
 */
export async function postTopic(boardId: number | string, topicParams: ITopicParams) {
  return POST(`board/${boardId}/topic`, {
    params: topicParams,
  })
}

/**
 * 回帖
 */
export async function replyTopic(topicId: number | string, postParams: IPostParams) {
  return POST(`topic/${topicId}/post`, {
    params: postParams,
  })
}

/**
 * 编辑帖子
 */
export async function editorPost(topicId: number | string, params: ITopicParams | IPostParams) {
  return PUT(`post/${topicId}`, {
    params,
  })
}
