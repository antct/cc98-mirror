import { CDN, IMG_BASE_URL } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { ITagHandler, TagNode } from '@cc98/ubb-core'
import { globalHistory, HistoryUnsubscribe } from '@reach/router'
import 'aplayer/dist/APlayer.min.css'
import React, { useEffect, useRef } from 'react'


const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const { title, author } = node.tagData
    return <Audio src={node.innerText} title={title} author={author} />
  },
}

interface Props {
  /**
   * 音频文件地址
   */
  src: string
  title: string
  author: string
}

const Audio: React.FC<Props> = ({ src, title, author }) => {
  const { useCDN } = useModel(settingModel, ['useCDN'])
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let aplayer: any = null
    let unsubscribe: HistoryUnsubscribe | null

    import('aplayer').then(({ default: APlayer }) => {
      aplayer = new APlayer({
        container: divRef.current,
        autoplay: false,
        preload: 'metadata',
        audio: {
          url: encodeURI(!useCDN ? src : CDN(src, false)),
          name: title ? title : encodeURI(!useCDN ? src : CDN(src, false)),
          author: author ? author : null,
          cover: `${IMG_BASE_URL}/audio_cover.png`,
        },
      })

      aplayer.on('error', () => {
        aplayer && aplayer.destroy()
        if (!divRef.current) return
        aplayer = new APlayer({
          container: divRef.current,
          autoplay: false,
          preload: 'metadata',
          audio: {
            url: encodeURI(src),
            name: title ? title : encodeURI(src),
            author: author ? author : null,
            cover: `${IMG_BASE_URL}/audio_cover.png`,
          },
        })
        aplayer.on('error', () => {})
      })

      // 监听到 url 改变，暂停播放
      unsubscribe = globalHistory.listen(() => {
        aplayer && aplayer.pause()
      })
    })

    return () => {
      unsubscribe && unsubscribe()
      aplayer && aplayer.destroy()
    }
  }, [])

  return <div className="aplayer ubb-aplayer" style={{ whiteSpace: 'normal' }} ref={divRef} />
}

export default handler
