import { IContext } from '@cc98/context'
import { ITextHandler, TextNode } from '@cc98/ubb-core'
import React from 'react'


const handler: ITextHandler<React.ReactNode> = {
  render(node: TextNode, context: IContext) {
    return node.text
  },
}

export default handler
