import { IPost, IUser } from '@cc98/api'

// 版主不能编辑管理员
// 管理可以互相TP
// 超级版主当作管理员

// 编辑post
export function judgeEdit(
  myInfo: IUser | null,
  userInfo: IUser | undefined,
  postInfo: IPost,
  boardMasters: string[]
) {
  // if ((myInfo && myInfo.id) === (userInfo && userInfo.id) || postInfo.isAnonymous) return true
  if (postInfo.isMe) return true
  // 本人是管理员允许修改任何帖子
  if (myInfo && (myInfo.privilege === '管理员' || myInfo.privilege === '超级版主')) return true
  // 不是管理员包括版主不允许修改管理员的帖子
  if (userInfo && (userInfo.privilege === '管理员' || userInfo.privilege === '超级版主')) {
    return false
  }
  // 本人是版主可以修改其他帖子
  if (myInfo && boardMasters.indexOf(myInfo.name) !== -1) return true

  return false
}

// 本人是管理员才允许的操作
export function judgeManager(myInfo: IUser | null) {
  if (myInfo && (myInfo.privilege === '管理员' || myInfo.privilege === '超级版主')) return true

  return false
}

// 管理员与当前版面版主允许的操作
export function judgeManagerOrBoardMasters(myInfo: IUser | null, boardMasters: string[]) {
  // 本人是管理员
  if (myInfo && (myInfo.privilege === '管理员' || myInfo.privilege === '超级版主')) return true
  // 本人是本版版主
  if (myInfo && boardMasters.indexOf(myInfo.name) !== -1) return true

  return false
}
