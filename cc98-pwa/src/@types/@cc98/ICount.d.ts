declare module '@cc98/api' {
  interface ICountData {
    id: number
    date: string
    userCount: number
    topicCount: number
    replyCount: number
  }

  export interface ICount {
    data: ICountData[]
    count: number
    from: number
    size: number
    extra: string
    errorCode: number
  }
}
