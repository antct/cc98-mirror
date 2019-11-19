declare module '@cc98/api' {
  export interface IReply {
    id: number
    type: number
    topicId: number
    boardId: number
    postId: number
    time: string
    isRead: true
  }
}
