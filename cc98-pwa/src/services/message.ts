import { GET, POST, PUT } from '@/utils/fetch'
import { IMessageContent, IRecentMessage } from '@cc98/api'
import userModel from '@/models/user'

/**
 * 获取近期私信列表
 */
export function getRecentMessage(from: number) {
  return GET<IRecentMessage[]>('message/recent-contact-users', {
    params: {
      from,
      size: 20,
    },
  })
}

/**
 * 获取私信内容
 */
export function getMessageContent(userId: number | string, from: number, size: number) {
  return GET<IMessageContent[]>(`message/user/${userId}`, {
    params: {
      from,
      size,
    },
  })
}

/**
 * 发送私信
 */
export function sendMessage(ReceiverId: number | string, Content: string) {
  return POST<string>('message', {
    params: {
      ReceiverId,
      Content,
    },
  })
}

/**
 * 清除所有回复
 */
export async function readAllReply() {
  const res = await PUT('notification/read-all-reply')
  res.fail().succeed(() => {
    userModel.FRESH_READ()
  })
}

/**
 * 清除所有AT
 */
export async function readAllAt() {
  const res = await PUT('notification/read-all-at')
  res.fail().succeed(() => {
    userModel.FRESH_READ()
  })
}

/**
 * 清除所有系统
 */
export async function readAllSystem() {
  const res = await PUT('notification/read-all-system')
  res.fail().succeed(() => {
    userModel.FRESH_READ()
  })
}