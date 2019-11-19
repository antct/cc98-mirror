interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || 'https://api.96486d9b.cn/cc98/token',
  api: process.env.api || 'https://api.96486d9b.cn/cc98',
}

export default host
