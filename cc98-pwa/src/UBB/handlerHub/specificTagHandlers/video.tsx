import { CDN } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { ITagHandler, TagNode } from '@cc98/ubb-core'
import { globalHistory, HistoryUnsubscribe } from '@reach/router'
// import 'dplayer/dist/DPlayer.min.css'
import React, { useEffect, useRef } from 'react'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    return <Video src={node.innerText} />
  },
}

interface Props {
  /**
   * 视频文件地址
   */
  src: string
}

const Video: React.FC<Props> = ({ src }) => {
  const { useCDN } = useModel(settingModel, ['useCDN'])
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let dplayer: any = null
    let unsubscribe: HistoryUnsubscribe | null

    import('dplayer').then(({ default: DPlayer }) => {
      dplayer = new DPlayer({
        container: divRef.current,
        autoplay: false,
        preload: 'metadata',
        video: {
          url: encodeURI(!useCDN ? src : CDN(src, false)),
          type: 'auto',
        },
      })

      dplayer.on('error', () => {
        dplayer && dplayer.destroy()
        if (!divRef.current) return
        dplayer = new DPlayer({
          container: divRef.current,
          autoplay: false,
          preload: 'metadata',
          video: {
            url: encodeURI(src),
            type: 'auto',
          },
        })
        dplayer.on('error', () => { })
      })

      // 监听到 url 改变，暂停播放
      unsubscribe = globalHistory.listen(() => {
        dplayer && dplayer.pause()
      })
    })

    return () => {
      unsubscribe && unsubscribe()
      dplayer && dplayer.destroy()
    }
  }, [])

  return <div className="dplayer" style={{ whiteSpace: 'normal' }} ref={divRef} />
}

export default handler
