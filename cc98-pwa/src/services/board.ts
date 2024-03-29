import { DELETE, GET, PUT } from '@/utils/fetch'
import {
  IBasicBoard, IBoard, IBoardGroup, IBoardRecord,
  IBoardStopPostUser, ITagGroup
} from '@cc98/api'
import { cacheService } from './utils'


/**
 * 获取所有版面信息
 */
export const getBoardsInfo = cacheService(
  () => GET<IBoardGroup[]>('board/all'),
  'boardsInfo',
  3600 * 24 * 7
)

// Cache Map for Board
let HAS_MAP = false
export const BOARD_MAP: {
  [id: number]: IBasicBoard
} = {}

/** 创建 BOARD_MAP */
export async function buildBoardMap() {
  if (HAS_MAP) return
  const res = await getBoardsInfo()
  res.fail().succeed(boards => {
    // 防止重复创建
    if (HAS_MAP) {
      return
    }
    for (const baseBoard of boards) {
      for (const childBoard of baseBoard.boards) {
        BOARD_MAP[childBoard.id] = childBoard
      }
    }
    HAS_MAP = true
  })
}

/**
 * 获取版面的版主信息（返回值不是 Try）
 */
export async function getBoardMastersById(boardId: number) {
  await buildBoardMap()
  return BOARD_MAP[boardId].boardMasters || []
}

/**
 * 通过版面Id获取版面名称（返回值不是 Try）
 */
export async function getBoardNameById(boardId: number) {
  await buildBoardMap()
  return BOARD_MAP[boardId] ? BOARD_MAP[boardId].name : '版面失效'
}

/**
 * 通过版面Id获取版面（返回值不是 Try）
 */
export async function getBoardById(boardId: number) {
  await buildBoardMap()
  return BOARD_MAP[boardId] ? BOARD_MAP[boardId] : undefined
}

/**
 * 获取单个版面信息
 */
export function getBoardInfo(id: string | number) {
  return GET<IBoard>(`board/${id}`)
}

/**
 * 获取某个版面的标签组
 */
export async function getBoardTags(id: string | number) {
  return GET<ITagGroup[]>(`board/${id}/tag`)
}

/**
 * 关注/取关版面
 */
export function customBoard(id: number, opt: 0 | 1) {
  const url = `me/custom-board/${id}`
  if (opt === 1) {
    return PUT(url)
  }
  return DELETE(url)
}

/**
 * 获取版面事件
 */
export async function getBoardEvent(boardId: string | number, from: number) {
  const res = await GET<IBoardRecord>(`board/${boardId}/events`, {
    params: {
      from,
      size: 20,
    },
  })
  return await Promise.resolve(res.map(events => events.boardEvents))
}

/**
 * 获取版面小黑屋
 */
export function getBoardStopPostUser(boardId: string | number, from: number) {
  return GET<IBoardStopPostUser[]>(`board/${boardId}/stop-post-user`, {
    params: {
      from,
      size: 20,
    },
  })
}
