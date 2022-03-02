import { IContext } from '@cc98/context'
import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'


const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /line/,

  render(node: TagNode, context: IContext) {
    return <hr className='ubb-tag-hr' />
  },
}

export default handler
