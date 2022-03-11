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
      <LazyLoad height={200} offset={200} once overflow={node.parent && node.parent instanceof TagNode && node.parent.tagName === 'quote'}>
        <PhotoView src={!useCDN ? `${node.innerText}` : CDN(node.innerText, false)}>
          {/* <div style={{ maxHeight: 1000, overflow: 'auto' }}> */}
          <div>
            {!useCDN ? (
              useCompress ?
                <img className="ubb-tag-img" src={`${node.innerText}?compress=true&width=${IMG_COMPRESS_WIDTH}`} />
                :
                <img className="ubb-tag-img" src={`${node.innerText}?compress=false`} />)
              :
              <img className="ubb-tag-img"
                src={CDN(node.innerText, false)}
                onError={
                  (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    if (event.currentTarget.src === node.innerText) return
                    event.currentTarget.src = node.innerText
                  }
                }
              />
            }
          </div>
        </PhotoView>
      </LazyLoad>
    )
  },
}

export default handler