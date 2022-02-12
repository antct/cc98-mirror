import { CDN, IMG_COMPRESS_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getFaces } from '@/services/post'
import { UBBReact } from '@/UBB'
import { IPost } from '@cc98/api'
import { Typography } from '@material-ui/core'
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

  // FIXME: 链接转换还存在许多BUG
  // // 目标：需要将那些未转化的链接，转化为可点击的链接
  // // 规范化，去除多余的空格
  // if (postInfo.contentType == 0) {
  //   const ubb_link_regex = /\[url.*?\]\s*(.*?)\s*\[\/url\]/g
  //   regex_content = regex_content.replace(ubb_link_regex, `[url]$1[/url]`)
  //   const ubb_image_regex = /\[img.*?\]\s*(.*?)\s*\[\/img\]/g
  //   regex_content = regex_content.replace(ubb_image_regex, `[img]$1[/img]`)
  // } else {
  //   const markdown_link_regex = /([^!]|^)\[.*?\]\(\s*(.*?)\s*\)/g
  //   regex_content = regex_content.replace(markdown_link_regex, `$1[$2]($2)`)
  //   const markdown_image_regex = /!\[.*?\]\(\s*(.*?)\s*\)/g
  //   regex_content = regex_content.replace(markdown_image_regex, `![]($1)`)
  // }
  // // 对那些未使用[url]或md标签的链接进行改造
  // // const http_regex = /(?<!\[url\]|\[img\]|\[\]\()(http[s]?\:\/\/?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.*[a-zA-Z]{2,6}[a-zA-Z0-9\.\&\/\?\:@\-_=#%~]*)/g
  // const http_regex = /([^\]\[\)\(=]|^)(http[s]?\:\/\/?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.*[a-zA-Z]{2,6}[a-zA-Z0-9\.\&\/\?\:@\-_=#%~]*)/g
  // if (postInfo.contentType === 0) {
  //   regex_content = regex_content.replace(http_regex, `$1[url=$2]$2[/url]`)
  // } else {
  //   regex_content = regex_content.replace(http_regex, `$1[$2]($2)`)
  // }

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
              onClick={() => {
                setIntros(prevIntros => {
                  const newIntros = { ...prevIntros }
                  newIntros[index] = ['人脸检测识别中...']
                  return newIntros
                })
                const src = images[index].src
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
                      intro.push(`X: ${face.x.toFixed(2)} Y: ${face.y.toFixed(2)} 性别: ${face.gender <= 49 ? '女' : '男'} 年龄: ${face.age} 笑容: ${face.expression} 发型: ${face.hair} 魅力值: ${face.beauty}`)
                    }
                    setIntros(prevIntros => {
                      const newIntros = { ...prevIntros }
                      newIntros[index] = intro
                      return newIntros
                    })
                  })
                )
              }}
              width="44"
              height="44"
              fill="white"
              viewBox="0 0 768 768"
            >
              <path d="M384 559.5c-75 0-138-45-163.5-111h327c-25.5 66-88.5 111-163.5 111zM271.5 352.5c-27 0-48-21-48-48s21-48 48-48 48 21 48 48-21 48-48 48zM496.5 352.5c-27 0-48-21-48-48s21-48 48-48 48 21 48 48-21 48-48 48zM384 640.5c141 0 256.5-115.5 256.5-256.5s-115.5-256.5-256.5-256.5-256.5 115.5-256.5 256.5 115.5 256.5 256.5 256.5zM384 64.5c177 0 319.5 142.5 319.5 319.5s-142.5 319.5-319.5 319.5-319.5-142.5-319.5-319.5 142.5-319.5 319.5-319.5z" />
            </svg>
            <svg
              className="PhotoView-PhotoSlider__toolbarIcon"
              width="44"
              height="44"
              viewBox="0 0 768 768"
              fill="white"
              onClick={() => onScale(scale + 0.2)}
            >
              <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
            </svg>
            <svg
              className="PhotoView-PhotoSlider__toolbarIcon"
              width="44"
              height="44"
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
