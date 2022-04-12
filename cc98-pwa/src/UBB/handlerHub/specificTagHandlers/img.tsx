import { CDN, IMG_COMPRESS_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { ITagHandler, TagNode } from '@cc98/ubb-core'
import { Skeleton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import { PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const { useCompress, useCDN } = useModel(settingModel, ['useCompress', 'useCDN'])
    const [loading, setLoading] = useState(true)
    const [fold, setFold] = useState(true)
    return (
      <LazyLoad
        height={200}
        offset={200}
        once
        overflow={node.parent && node.parent instanceof TagNode && node.parent.tagName === 'quote'}
      >
        {loading && <Skeleton height={200} sx={{ transform: 'unset', borderRadius: 'unset' }} />}
        <PhotoView src={!useCDN ? `${node.innerText}` : CDN(node.innerText, false)}>
          {/* <div style={{ maxHeight: 1000, overflow: 'auto' }}> */}
          <div>
            <img
              className="ubb-tag-img"
              src={!useCDN ? (useCompress ? `${node.innerText}?compress=true&width=${IMG_COMPRESS_WIDTH}` : `${node.innerText}?compress=false`) : CDN(node.innerText, false)}
              onLoad={() => setLoading(false)}
              onError={
                (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  if (event.currentTarget.src === node.innerText) return
                  event.currentTarget.src = node.innerText
                }
              }
            />
          </div>
        </PhotoView>
      </LazyLoad>
    )
  },
}

export default handler