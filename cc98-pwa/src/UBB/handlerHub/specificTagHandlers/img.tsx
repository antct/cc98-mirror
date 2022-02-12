import { CDN, IMG_COMPRESS_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { ITagHandler, TagNode } from '@cc98/ubb-core'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const { useCompress, useCDN } = useModel(settingModel, ['useCompress', 'useCDN'])
    return (
      <LazyLoad height={200} offset={200} once>
        <PhotoView src={!useCDN ? `${node.innerText}` : CDN(node.innerText, false)} >
          {!useCDN ? (
            useCompress ?
              <img className="ubb-tag-img" src={`${node.innerText}?compress=true&width=${IMG_COMPRESS_WIDTH}`} />
              :
              <img className="ubb-tag-img" src={`${node.innerText}?compress=false`} />)
            :
            <img className="ubb-tag-img" src={CDN(node.innerText, false)} />
          }
        </PhotoView>
      </LazyLoad>
    )
  },
}

export default handler