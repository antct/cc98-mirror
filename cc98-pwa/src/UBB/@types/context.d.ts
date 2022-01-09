declare module '@cc98/context' {
  import { ModeEnum } from '@/theme'
  import { IContext as ICoreContext, TagNode } from '@cc98/ubb-core'
  import React from 'react'

  export interface IContext extends ICoreContext {
    /**
     * 主题
     */
    mode: ModeEnum
    /**
     * 表情包地址 baseURL
     */
    imgBaseURL: string
    /**
     * 最外层的 [quote]
     */
    quoteRoot?: TagNode | null
    /**
     * 嵌套引用列表
     */
    quotes?: React.ReactNode[]
  }
}
