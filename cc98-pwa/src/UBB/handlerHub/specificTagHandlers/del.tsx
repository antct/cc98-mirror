import { IContext } from '@cc98/context'
import { ITagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'


const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    return <span className="ubb-tag-del">{children}</span>
  },
}

export default handler
