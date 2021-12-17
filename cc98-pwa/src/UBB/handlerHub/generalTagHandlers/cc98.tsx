import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'

import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /cc98\d{2}/i,

  render(node: TagNode, context: IContext) {
    const cc98ID = node.tagData.__tagName__.slice(4)

    const url = ((cc98ID>='15' && cc98ID<='30') ?`${context.imgBaseURL}/CC98/CC98${cc98ID}.png`:`${context.imgBaseURL}/CC98/CC98${cc98ID}.gif`)

    return <img className="ubb-tag-cc98" src={url} alt={`[CC98${cc98ID}]`} />
  },
}

export default handler
