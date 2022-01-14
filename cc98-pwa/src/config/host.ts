interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || 'https://api.ttxixi.cc/cc98/token',
  api: process.env.api || 'https://api.ttxixi.cc/cc98',
}

export default host
