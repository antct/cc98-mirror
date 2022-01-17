export const IMG_BASE_URL = 'https://api.ttxixi.cc/cc98/images'
export const AVATAR_COMPRESS_WIDTH = 50
export const USER_COMPRESS_WIDTH = 100
export const MAX_WIDTH = document.body.clientWidth <= 600 ? 600 : document.body.clientWidth - 180
export const IS_PC = document.body.clientWidth >= MAX_WIDTH
export const IMG_COMPRESS_WIDTH = IS_PC ? 500 : 300