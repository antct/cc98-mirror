import { CDN } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'

const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /cc98\d{2}/i,

  render(node: TagNode, context: IContext) {
    const { useCDN } = useModel(settingModel, ['useCDN'])
    const cc98ID = node.tagData.__tagName__.slice(4)

    const url = (((cc98ID >= '15' && cc98ID <= '30') || cc98ID >= '36') ? `${context.imgBaseURL}/CC98/CC98${cc98ID}.png` : `${context.imgBaseURL}/CC98/CC98${cc98ID}.gif`)

    return <img className="ubb-tag-cc98" src={useCDN ? CDN(url, false) : url} alt={`[CC98${cc98ID}]`} referrerPolicy='no-referrer' />
  },
}

export default handler
