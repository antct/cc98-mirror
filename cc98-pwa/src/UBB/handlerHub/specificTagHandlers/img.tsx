import { ITagHandler, TagNode } from '@cc98/ubb-core'

import { IContext } from '@cc98/context'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import React from 'react'

import LazyLoad from 'react-lazyload'

// import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
// import 'react-photo-view/dist/index.css'

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: false,

  render(node: TagNode, context: IContext) {
    const { useCompress } = useModel(settingModel, ['useCompress'])
    // return (
    //   <PhotoProvider>
    //     <PhotoConsumer src={`${node.innerText}!${useCompress}`}>
    //       <img src={`${node.innerText}!${useCompress}`} alt="" />
    //     </PhotoConsumer>
    //   </PhotoProvider>
    // );
    return <LazyLoad height={200} offset={200}><img className="ubb-tag-img" src={`${node.innerText}?compress=${useCompress}`} /></LazyLoad>
  },
}

export default handler