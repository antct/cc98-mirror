interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || 'http://101.42.106.165/cc98/token',
  api: process.env.api || 'http://101.42.106.165/cc98',
}

export default host
