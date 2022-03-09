import { CDN } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { ModeEnum } from '@/theme'
import { IContext } from '@cc98/context'
import { IGeneralTagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'


const handler: IGeneralTagHandler<React.ReactNode> = {
  isRecursive: false,

  match: /ac\d{2}/i,

  render(node: TagNode, context: IContext) {
    const { useCDN } = useModel(settingModel, ['useCDN'])
    const acID = node.tagData.__tagName__.slice(2)

    const url =
      context.mode === ModeEnum.LIGHT
        ? `${context.imgBaseURL}/ac/${acID}.png`
        : `${context.imgBaseURL}/ac-reverse/${acID}.png`

    return <img className="ubb-tag-ac" src={useCDN ? CDN(url, false) : url} alt={`[ac${acID}]`} />
  },
}

export default handler
