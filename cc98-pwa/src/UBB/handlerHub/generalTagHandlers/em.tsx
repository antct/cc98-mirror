import { CDN } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'


const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /em\d{2}/i,

  render(node: TagNode, context: IContext) {
    const { useCDN } = useModel(settingModel, ['useCDN'])
    const emID = node.tagData.__tagName__.slice(2)

    const url = `${context.imgBaseURL}/em/em${emID}.gif`

    return <img className="ubb-tag-em" src={useCDN ? CDN(url, false) : url} alt={`[em${emID}]`} />
  },
}

export default handler
