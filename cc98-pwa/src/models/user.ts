import { Model } from '@/hooks/useModel'
import { navigate } from '@/utils/history'
import { GET } from '@/utils/fetch'
import { logIn, logOut, isLogIn } from '@/utils/logIn'
import { IUser, IUnRead } from '@cc98/api'

interface State {
  /**
   * 是否登录
   */
  isLogIn: boolean
  /**
   * 个人账户信息
   */
  myInfo: IUser | null
  unRead: IUnRead | null
}

class UserModel extends Model<State> {
  constructor() {
    super()

    this.state = {
      isLogIn: isLogIn(),
      myInfo: null,
      unRead: null
    }

    this.FRESH_INFO()
  }

  LOG_IN = async (username: string, password: string) => {
    const token = await logIn(username, password)

    token.fail().succeed(_ => {
      this.setState({
        isLogIn: true,
      })
      this.FRESH_INFO()
    })

    return token
  }

  LOG_OUT = () => {
    logOut()

    this.setState({
      isLogIn: false,
      myInfo: null,
      unRead: null
    })

    // not a wise way
    const HOME = async () => {
      navigate('/')
    }
    HOME()
  }

  FRESH_INFO = async () => {
    if (!this.state.isLogIn) {
      return
    }

    const myInfo = await GET<IUser>('me')
    myInfo.fail().succeed(myInfo => {
      this.setState({
        myInfo,
      })
    })
    const unRead = await GET<IUnRead>('me/unread-count')
    unRead.fail().succeed(unRead => {
      this.setState({
        unRead,
      })
    })
  }
}

export default new UserModel()
