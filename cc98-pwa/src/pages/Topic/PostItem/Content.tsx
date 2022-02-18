import { CDN, IMG_COMPRESS_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getEnhancedImage, getFaces } from '@/services/post'
import { UBBReact } from '@/UBB'
import { IPost } from '@cc98/api'
import { Typography } from '@mui/material'
import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import MarkdownView from 'react-showdown'
import styled from 'styled-components'

const Overlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;
  width: 100%;
  min-height: 44px;
  line-height: 1.5;
  font-size: 14px;
  color: #ccc;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: justify;
  z-index: 1000;
`

const CustomImageComponent = ({ originalSrc, compressSrc }: { originalSrc: string, compressSrc: string }) => {
  return (
    <LazyLoad height={200} offset={200} once>
      <PhotoView src={`${originalSrc}`} >
        <img className="ubb-tag-img" src={`${compressSrc}`} />
      </PhotoView>
    </LazyLoad>
  )
}

const Markdown = (content: string) => {
  return <MarkdownView
    markdown={content}
    options={{ tables: true, emoji: true }}
    components={{ CustomImageComponent }}
  />
}

const TypographyS = muiStyled(Typography).attrs({
})({
  margin: '12px 16px',
  marginBottom: 0
})

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
}

export default ({ postInfo }: Props) => {
  const { useCompress, useCDN } = useModel(settingModel, ['useCompress', 'useCDN'])
  let regex_content = postInfo.content.trim()

  // FIXME: 可能还存在BUG
  const http_regex = /([^\]\[\)\(= ]|^)( *http[s]?\:\/\/?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.*[a-zA-Z]{2,6}[a-zA-Z0-9\.\&\/\?\:@\-_=#%~]*)/g
  const image_regex = /.*\.(gif|jpe?g|bmp|png)$/ig
  regex_content = regex_content.replace(http_regex, (match: string, capture1: string, capture2: string) => {
    if (image_regex.test(capture2)) return match
    else {
      const url = capture2.trim()
      if (url.startsWith(window.location.origin)) {
        const inner_url = url.substring(window.location.origin.length)
        return postInfo.contentType === 0 ? `${capture1}[url=${url}]跳转到帖子(${inner_url})[/url]` : `${capture1}[跳转到帖子(${inner_url})](${url})`
      }
      else return postInfo.contentType === 0 ? `${capture1}[url=${url}]跳转到外链(${url})[/url]` : `${capture1}[跳转到外链(${url})](${url})`
    }
  })

  // markdown下的图片进行改造
  if (postInfo.contentType === 1) {
    const markdown_image_regex = /!\[.*?\]\((.*?)\)/g
    regex_content = regex_content.replace(markdown_image_regex, (match: string, capture: string) => {
      return `<CustomImageComponent originalSrc="${!useCDN ? capture : CDN(capture, false)}" compressSrc="${!useCDN ? (useCompress ? `${capture}?compress=true&width=${IMG_COMPRESS_WIDTH}` : `${capture}?compress=false`) : CDN(capture, false)}" />`
    })
  }
  // 分享模式禁止跳转
  if (window.location.pathname.startsWith('/share')) {
    const ubb_link_regex = /\[url.*?\].*?\[\/url\]/g
    // const markdown_link_regex = /(?<!!)\[.*?\]\(.*?\)/g
    const markdown_link_regex = /([^!]|^)\[.*?\]\(.*?\)/g
    if (postInfo.contentType === 0) regex_content = regex_content.replace(ubb_link_regex, '[url]分享模式禁止跳转[/url]')
    else regex_content = regex_content.replace(markdown_link_regex, `$1[分享模式禁止跳转](${window.location.href})`)
  }

  const content = postInfo.contentType === 0 ? UBBReact(regex_content) : Markdown(regex_content)

  // 每张图片的介绍
  const [intros, setIntros] = useState<{ [id: number]: string[] }>({})
  const [srcs, setSrcs] = useState<{ [id: number]: string }>({})
  return (
    <PhotoProvider
      overlayRender={({ rotate, onRotate, scale, index }) => {
        return (
          intros[index] &&
          <Overlay>
            {intros[index].map((value, index) => <div>{value}</div>)}
          </Overlay>
        );
      }}
      toolbarRender={({ images, rotate, onRotate, onScale, scale, index }) => {
        return (
          <>
            <svg
              className="PhotoView-PhotoSlider__toolbarIcon"
              width="38"
              height="38"
              viewBox="0 0 1024 1024"
              fill="white"
              onClick={() => {
                setIntros(prevIntros => {
                  const newIntros = { ...prevIntros }
                  newIntros[index] = ['图片增强中...']
                  return newIntros
                })
                const src = srcs[index] || images[index].src
                src && getEnhancedImage(src).then(res =>
                  res.fail().succeed(data => {
                    if (data.msg) {
                      setIntros(prevIntros => {
                        const newIntros = { ...prevIntros }
                        newIntros[index] = [data.msg ? data.msg : '']
                        return newIntros
                      })
                      return
                    }
                    const intro: string[] = ['图片增强完成']
                    images[index].src = data.url
                    setIntros(prevIntros => {
                      const newIntros = { ...prevIntros }
                      newIntros[index] = intro
                      return newIntros
                    })
                    setSrcs(prevSrcs => {
                      const newSrcs = { ...prevSrcs }
                      newSrcs[index] = src
                      return newSrcs
                    })
                  })
                )
              }}
            >
             <path d="M120 334a40 40 0 0 1 40 40V476h80V374a40 40 0 1 1 80 0v284a40 40 0 1 1-80 0V556H160v102a40 40 0 1 1-80 0v-284a40 40 0 0 1 40-40zM984 760a40 40 0 0 1 40 40v64c0 88.224-71.776 160-160 160H160c-88.224 0-160-71.776-160-160v-64a40 40 0 1 1 80 0v64c0 44.112 35.888 80 80 80h704c44.112 0 80-35.888 80-80v-64a40 40 0 0 1 40-40zM864 0c88.224 0 160 71.776 160 160v72a40 40 0 1 1-80 0v-72c0-44.112-35.888-80-80-80H160c-44.112 0-80 35.888-80 80v72a40 40 0 1 1-80 0v-72C0 71.776 71.776 0 160 0h704z m78 460c0 43.52-22.552 81.84-56.56 103.976l49.424 71.224a40 40 0 1 1-65.728 45.6L801.968 584H780v74a40 40 0 1 1-80 0V376a40 40 0 0 1 40-40h78c68.376 0 124 55.624 124 124z m-124 44c24.264 0 44-19.736 44-44s-19.736-44-44-44H780v88h38zM503 698H430a40 40 0 0 1-40-40v-284a40 40 0 0 1 40-40h73C574.128 334 632 391.872 632 463v106c0 71.128-57.872 129-129 129z m-33-284v204h33A49.056 49.056 0 0 0 552 569v-106a49.056 49.056 0 0 0-49-49H470z" p-id="2110"></path>
            </svg>
            <svg
              className="PhotoView-PhotoSlider__toolbarIcon"
              onClick={() => {
                setIntros(prevIntros => {
                  const newIntros = { ...prevIntros }
                  newIntros[index] = ['人脸检测识别中...']
                  return newIntros
                })
                const src = srcs[index] || images[index].src
                src && getFaces(src).then(res =>
                  res.fail().succeed(data => {
                    if (data.msg) {
                      setIntros(prevIntros => {
                        const newIntros = { ...prevIntros }
                        newIntros[index] = [data.msg ? data.msg : '']
                        return newIntros
                      })
                      return
                    }
                    const faces = data.faces
                    const intro: string[] = []
                    intro.push(faces.length > 0 ? `检测到${faces.length}张人脸` : '未检测到人脸')
                    for (let i = 0; i < faces.length; i++) {
                      const face = faces[i]
                      intro.push(`[${i + 1}] 性别: ${face.gender <= 49 ? '女' : '男'} 年龄: ${face.age} 笑容: ${face.expression} 发型: ${face.hair} 魅力值: ${face.beauty}`)
                    }
                    if (faces.length > 0) images[index].src = data.url
                    setIntros(prevIntros => {
                      const newIntros = { ...prevIntros }
                      newIntros[index] = intro
                      return newIntros
                    })
                    setSrcs(prevSrcs => {
                      const newSrcs = { ...prevSrcs }
                      newSrcs[index] = src
                      return newSrcs
                    })
                  })
                )
              }}
              width="42"
              height="42"
              fill="white"
              viewBox="0 0 1024 1024"
            >
              <path d="M810.666667 213.333333h-128a42.666667 42.666667 0 0 1 0-85.333333h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666666a42.666667 42.666667 0 0 1-85.333333 0V213.333333zM213.333333 213.333333v128a42.666667 42.666667 0 1 1-85.333333 0V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h170.666666a42.666667 42.666667 0 1 1 0 85.333333H213.333333z m597.333334 597.333334v-128a42.666667 42.666667 0 0 1 85.333333 0v170.666666a42.666667 42.666667 0 0 1-42.666667 42.666667h-170.666666a42.666667 42.666667 0 0 1 0-85.333333h128zM213.333333 810.666667h128a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667v-170.666666a42.666667 42.666667 0 0 1 85.333333 0v128z m341.333334-341.333334a42.666667 42.666667 0 0 1 0 85.333334h-42.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V384a42.666667 42.666667 0 0 1 85.333334 0v85.333333z m77.994666 120.661334a42.666667 42.666667 0 0 1 60.373334 60.373333 256 256 0 0 1-362.069334 0 42.666667 42.666667 0 0 1 60.373334-60.373333 170.666667 170.666667 0 0 0 241.322666 0zM640 384a42.666667 42.666667 0 0 1 85.333333 0v42.666667a42.666667 42.666667 0 0 1-85.333333 0V384zM298.666667 384a42.666667 42.666667 0 1 1 85.333333 0v42.666667a42.666667 42.666667 0 0 1-85.333333 0V384z" />
            </svg>
            <svg
              className="PhotoView-PhotoSlider__toolbarIcon"
              width="42"
              height="42"
              viewBox="0 0 768 768"
              fill="white"
              onClick={() => onScale(scale + 0.2)}
            >
              <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
            </svg>
            <svg
              className="PhotoView-PhotoSlider__toolbarIcon"
              width="42"
              height="42"
              viewBox="0 0 768 768"
              fill="white"
              onClick={() => onScale(scale - 0.2)}
            >
              <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
            </svg>
            <svg
              className="PhotoView-PhotoSlider__toolbarIcon"
              onClick={() => onRotate(rotate + 90)}
              width="44"
              height="44"
              fill="white"
              viewBox="0 0 768 768"
            >
              <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
            </svg>
          </>
        );
      }}
    >
      <TypographyS>{content}</TypographyS>
    </PhotoProvider>
  )
}
