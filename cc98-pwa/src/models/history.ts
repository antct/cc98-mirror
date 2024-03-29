import { Model } from '@/hooks/useModel'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { ITopic } from '@cc98/api'


export type IHistoryItem = Pick<ITopic, 'id' | 'title'> & {
  lastViewTime: number
}

interface State {
  historyList: IHistoryItem[]
}

class HistoryModel extends Model<State> {
  constructor() {
    super()
    this.state = {
      historyList: [],
    }

    const setting = getLocalStorage('history') as State | null
    this.setState(setting)
  }

  SYNC() {
    setLocalStorage('history', this.state)
  }

  PUSH(history: IHistoryItem) {
    const { historyList } = this.state
    const list = historyList.filter(item => history.id !== item.id)

    list.unshift(history)

    if (list.length > 50) {
      list.pop()
    }

    this.setState({ historyList: list })
    this.SYNC()
  }

  DELETE(id: number) {
    const { historyList } = this.state
    const list = historyList.filter(item => id !== item.id)

    this.setState({ historyList: list })
    this.SYNC()
  }
}

export default new HistoryModel()
