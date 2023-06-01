import { Model } from '@/hooks/useModel'
import { signIn } from '@/services/global'
import { GET } from '@/utils/fetch'
import { navigate } from '@/utils/history'
import { isLogIn, logIn, logOut } from '@/utils/logIn'
import snackbar from '@/utils/snackbar'
import { ISignIn, IUnRead, IUser } from '@cc98/api'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage'
import dayjs from 'dayjs'


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
  fanDiff: number
}

class UserModel extends Model<State> {
  constructor() {
    super()

    this.state = {
      isLogIn: isLogIn(),
      myInfo: null,
      unRead: null,
      fanDiff: 0
    }

    this.FRESH_INFO()
    this.FRESH_READ()
  }

  LOG_IN = async (username: string, password: string) => {
    const token = await logIn(username, password)

    token.fail(_ => {

    }).succeed(_ => {
      this.setState({
        isLogIn: true,
      })
      this.FRESH_INFO()
    })

    return token
  }

  LOG_IN_OIDC = async () => {
    this.setState({
      isLogIn: true,
    })
    this.FRESH_INFO()
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
      const lastFanCount = getLocalStorage(`${myInfo.id}_fan_count`) as string
      if (lastFanCount !== null && `${myInfo.fanCount}` !== lastFanCount) {
        this.setState({
          myInfo,
          fanDiff: myInfo.fanCount - parseInt(lastFanCount, 10)
        })
      } else {
        this.setState({
          myInfo,
        })
        setLocalStorage(`${myInfo.id}_fan_count`, `${myInfo.fanCount}`)
      }
    })

    const unRead = await GET<IUnRead>('me/unread-count')
    unRead.fail().succeed(unRead => {
      this.setState({
        unRead,
      })
    })

    const localState = getLocalStorage('sign_state') as string
    if (localState === null) {
      const signState = await GET<ISignIn>('me/signin')
      signState.fail().succeed(async state => {
        if (!state.hasSignedInToday) {
          const res = await signIn()
          res
            .fail(() => {
            })
            .succeed((msg) => {
              snackbar.success(`签到${state.lastSignInCount + 1}天，获得${msg}财富值`)
              setLocalStorage('sign_state', '1', dayjs().add(1, 'day').startOf('day').diff(dayjs(), 'second'))
            })
        } else {
          setLocalStorage('sign_state', '1', dayjs().add(1, 'day').startOf('day').diff(dayjs(), 'second'))
        }
      })
    }
  }

  FRESH_FAN = () => {
    if (!this.state.isLogIn) return
    if (this.state.myInfo) setLocalStorage(`${this.state.myInfo.id}_fan_count`, `${this.state.myInfo.fanCount}`)
    this.setState({
      fanDiff: 0
    })
  }

  FRESH_READ = async () => {
    if (!this.state.isLogIn) {
      return
    }

    const unRead = await GET<IUnRead>('me/unread-count')
    unRead.fail().succeed(unRead => {
      this.setState({
        unRead,
      })
    })
  }
}

export default new UserModel()
