import { Model } from '@/hooks/useModel'

interface State {
  userNames: string
  wealth: string
  reason: string
  isSending: boolean
  ownWealth: number
}

/**
 * 编辑器句柄
 */
export class WealthModel extends Model<State> {
  constructor() {
    super()
    this.state = {
      userNames: '',
      wealth: '',
      reason: '',
      isSending: false,
      ownWealth: 0
    }
  }

  setUserNames(str: string) {
    this.setState({
      userNames: str,
    })
  }

  setWealth(str: string) {
    this.setState({
      wealth: str,
    })
  }

  setReason(str: string) {
    this.setState({
      reason: str,
    })
  }

  setOwnWealth(str: number) {
    this.setState({
      ownWealth: str,
    })
  }

    /**
   * 清空输入
   */
  clearAll() {
    this.setState({
      userNames: '',
      wealth: '',
      reason: ''
    })
  }
}
