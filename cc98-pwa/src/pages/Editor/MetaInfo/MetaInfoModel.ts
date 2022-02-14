import { Model } from '@/hooks/useModel'

export interface VoteInfo {
  voteItems: string[]
  expiredDays: number
  maxVoteCount: number
  needVote: boolean
}


interface State {
  /**
   * 标题
   */
  title: string
  /**
   * 帖子类型
   */
  type: number
  /**
   * tag 1
   */
  tag1?: number
  /**
   * tag 2
   */
  tag2?: number
  isVote?: boolean
  voteInfo?: VoteInfo
}

/**
 * 帖子元信息 (title + type + tags)
 */
export class MetaInfoModel extends Model<State> {
  constructor(init: State) {
    super()
    this.state = {
      ...init, 
      isVote: false, 
      voteInfo: {
        voteItems: [],
        expiredDays: 0,
        maxVoteCount: 0,
        needVote: true
      }
    }
  }

  /**
   * 设置标题
   */
  setTitle(title: string) {
    this.setState({ title })
  }

  setType(type: number) {
    this.setState({ type })
  }

  setTag1(tag: number) {
    this.setState({ tag1: tag })
  }

  setTag2(tag: number) {
    this.setState({ tag2: tag })
  }

  setIsVote(isVote: boolean) {
    this.setState({ isVote: isVote })
  }

  setVoteInfo(voteInfo: VoteInfo) {
    this.setState({ voteInfo: voteInfo })
  }
}
