export const IMG_BASE_URL = 'https://api.ttxixi.cc/cc98/images'
export const FILE_BASE_URL = 'https://api.ttxixi.cc/cc98/files'
export const CDN_AVATAR_URL = 'https://cdn.img.cc98.top'
export const CDN_IMG_URL = 'https://cdn.img.cc98.top/static/images'
export const CDN_FILE_URL = 'https://cdn.img.cc98.top'
export const ANONYMOUS_AVATAR = `${CDN_IMG_URL}/_心灵之约.png`
export const AVATAR_COMPRESS_WIDTH = 50
export const IMG_COMPRESS_WIDTH = 300
export const MAX_WIDTH = 700
export const DRAWER_WIDTH = 180
export const IS_PC = document.body.clientWidth >= MAX_WIDTH + DRAWER_WIDTH
export const ONLINE_TIME = 30
export const CDN = (url: string, isAvatar: boolean) => {
    if (url.indexOf('files') !== -1) {
        if (isAvatar) return `${url.replace(FILE_BASE_URL, CDN_AVATAR_URL)}!avatar`
        else return `${url.replace(FILE_BASE_URL, CDN_FILE_URL)}`
    }
    else if (url.indexOf('images') !== -1) return `${url.replace(IMG_BASE_URL, CDN_IMG_URL)}`
    else return url
}