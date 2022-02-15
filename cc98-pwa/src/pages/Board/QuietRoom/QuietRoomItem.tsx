import { TopicItem } from '@/components/TopicList/TopicListItem'
import { navigate } from '@/utils/history'
import { IBoardStopPostUser } from '@cc98/api'
import dayjs from 'dayjs'
import React from 'react'


interface Props {
  /**
   * TP信息
   */
  info: IBoardStopPostUser
  /**
   * 版面 id
   */
  boardId: number
  /**
   * 解除TP后刷新
   */
  refreshFunc: () => void
  /**
   * 判断能否解除TP
   */
  canManage: boolean
}

export default ({ info, boardId, refreshFunc, canManage }: Props) => (
  <TopicItem
    title={info.userId === -1 ? '匿名' : info.userName}
    subtitle={`操作人：${info.operatorUserName}`}
    info1={dayjs(info.expiredTime).subtract(info.days, 'day').format('YYYY/MM/DD HH:mm')}
    info2={dayjs(info.expiredTime).format('YYYY/MM/DD HH:mm')}
    showAvatar={false}
    onClick={info.userId === -1 ? () => { } : () => navigate(`/user/${info.userId}`)}
  />
)
