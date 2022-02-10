import { AVATAR_COMPRESS_WIDTH, CDN, IMG_COMPRESS_WIDTH } from '@/config'
import { Model } from '@/hooks/useModel'
import { ModeEnum, ThemeEnum } from '@/theme'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'


interface State {
  /**
   * 主题
   */
  theme: ThemeEnum
  /**
   * 模式
   */
  mode: ModeEnum
  /**
   * 是否开启实时通知
   */
  useSignalr: boolean
  useNotification: boolean
  useSignature: boolean
  useCompress: boolean
  /**
   * 是否使用官方图床加速
   */
  useCDN: boolean
  useAvatar: boolean
  /**
   * 缓存页数
   */
  cacheSize: number
  /**
   * 自定义主页
   */
  customHome: number
  customWords: string[]
  /**
   * 首页订制按钮
   */
  showTheme: boolean
  showAnnouncement: boolean
  showRecommend: boolean
  showHot: boolean
  showStudy: boolean
  showEmotion: boolean
  showPartTimeJob: boolean
  showFullTimeJob: boolean
  showMarket: boolean
  showAcademic: boolean
  showSchoolEvent: boolean
  showSchoolNews: boolean
}

class SettingModel extends Model<State> {
  constructor() {
    super()

    this.state = {
      theme: ThemeEnum.DEFAULT,
      mode: ModeEnum.LIGHT,
      useSignalr: false,
      useSignature: false,
      useNotification: true,
      useAvatar: true,
      useCompress: true,
      useCDN: true,
      cacheSize: 3,
      customHome: 1,
      customWords: [],

      showTheme: true,
      showAnnouncement: true,
      showRecommend: true,
      showHot: true,
      showStudy: true,
      showEmotion: true,
      showPartTimeJob: true,
      showFullTimeJob: true,
      showMarket: true,
      showAcademic: true,
      showSchoolEvent: true,
      showSchoolNews: true
    }

    const setting = getLocalStorage('setting') as State | null
    this.setState(setting)
  }

  SYNC_SETTING = () => {
    setLocalStorage('setting', this.state)
  }

  TRANS_IMG = (url?: string, isAvatar?: boolean) => {
    if (url === undefined) return url
    if (this.state.useCDN) return CDN(url, !!isAvatar)
    if (this.state.useCompress) {
      if (!!isAvatar) return `${url}?compress=true&width=${AVATAR_COMPRESS_WIDTH}`
      else return `${url}?compress=true&width=${IMG_COMPRESS_WIDTH}`
    } else return `${url}?compress=false`
  }

  TOGGLE_MODE = () => {
    this.setState(state => ({
      mode: state.mode === ModeEnum.LIGHT ? ModeEnum.DARK : ModeEnum.LIGHT,
    }))
    this.SYNC_SETTING()
  }

  CHANGE_THEME = (theme: ThemeEnum) => {
    this.setState({ theme })
    this.SYNC_SETTING()
  }

  TOGGLE_SIGNALR = () => {
    this.setState(state => ({
      useSignalr: !state.useSignalr,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_SIGNATURE = () => {
    this.setState(state => ({
      useSignature: !state.useSignature,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_AVATAR = () => {
    this.setState(state => ({
      useAvatar: !state.useAvatar,
    }))
    this.SYNC_SETTING()
  }

  ADD_CUSTOMWORD = (word: string) => {
    this.setState(state => ({
      customWords: state.customWords.concat([word]),
    }))
    this.SYNC_SETTING()
  }

  DELETE_CUSTOMWORD = (id: number) => {
    this.setState(state => ({
      customWords: state.customWords.filter((value, index) => index !== id),
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_NOTIFICATION = () => {
    this.setState(state => ({
      useNotification: !state.useNotification,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_COMPRESS = () => {
    this.setState(state => ({
      useCompress: !state.useCompress,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_CDN = () => {
    this.setState(state => ({
      useCDN: !state.useCDN,
    }))
    this.SYNC_SETTING()
  }

  CHANGE_CACHE = (size: number) => {
    this.setState({
      cacheSize: size,
    })
    this.SYNC_SETTING()
  }

  CHANGE_CUSTOMHOME = (value: number) => {
    this.setState({
      customHome: value,
    })
    this.SYNC_SETTING()
  }

  TOGGLE_THEME = () => {
    this.setState(state => ({
      showTheme: !state.showTheme,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_ANNOUNCEMENT = () => {
    this.setState(state => ({
      showAnnouncement: !state.showAnnouncement,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_RECOMMEND = () => {
    this.setState(state => ({
      showRecommend: !state.showRecommend,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_HOT = () => {
    this.setState(state => ({
      showHot: !state.showHot,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_STUDY = () => {
    this.setState(state => ({
      showStudy: !state.showStudy,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_EMOTION = () => {
    this.setState(state => ({
      showEmotion: !state.showEmotion,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_PARTTIMEJOB = () => {
    this.setState(state => ({
      showPartTimeJob: !state.showPartTimeJob,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_FULLTIMEJOB = () => {
    this.setState(state => ({
      showFullTimeJob: !state.showFullTimeJob,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_MARKET = () => {
    this.setState(state => ({
      showMarket: !state.showMarket,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_SCHOOLEVENT = () => {
    this.setState(state => ({
      showSchoolEvent: !state.showSchoolEvent,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_SCHOOLNEWS = () => {
    this.setState(state => ({
      showSchoolNews: !state.showSchoolNewss,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_ACADEMIC = () => {
    this.setState(state => ({
      showAcademic: !state.showAcademic,
    }))
    this.SYNC_SETTING()
  }

}

export default new SettingModel()
