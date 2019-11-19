import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import React from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const { useCompress } = useModel(settingModel, ['useCompress'])
    return <img className="ubb-tag-img" src={`${node.innerText}!${useCompress}`} />
  },
}

export default handler
