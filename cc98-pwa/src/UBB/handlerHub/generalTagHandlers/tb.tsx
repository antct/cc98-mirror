import { CDN } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'


const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /tb\d{2}/i,

  render(node: TagNode, context: IContext) {
    const { useCDN } = useModel(settingModel, ['useCDN'])
    const tbID = node.tagData.__tagName__.slice(2)

    const url = `${context.imgBaseURL}/tb/tb${tbID}.png`

    return <img className="ubb-tag-tb" src={useCDN ? CDN(url, false) : url} alt={`[tb${tbID}]`} referrerPolicy='no-referrer' />
  },
}

export default handler
