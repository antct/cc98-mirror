import { IMG_COMPRESS_WIDTH } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { UBBReact } from '@/UBB'
import { IPost } from '@cc98/api'
import { Typography } from '@material-ui/core'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { PhotoConsumer, PhotoProvider } from 'react-photo-view'
import 'react-photo-view/dist/index.css'
import MarkdownView from 'react-showdown'

function CustomImageComponent({ originalSrc, compressSrc }: { originalSrc: string, compressSrc: string }) {
  return (
    <LazyLoad height={200} offset={200} once>
      <PhotoConsumer src={`${originalSrc}`} >
        <img className="ubb-tag-img" src={`${compressSrc}`} />
      </PhotoConsumer>
    </LazyLoad>
  )
}

function Markdown(content: string) {
  return <MarkdownView
    markdown={content}
    options={{ tables: true, emoji: true }}
    components={{ CustomImageComponent }}
  />
}

const TypographyS = muiStyled(Typography).attrs({
  // component: 'div',
})({
  margin: '12px 16px',
  marginBottom: 4,

  /* for markdown */
  '& img': {
    maxWidth: '100%',
  },
})

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
}

export default ({ postInfo }: Props) => {
  const { useCompress } = useModel(settingModel, ['useCompress'])
  let regex_content = postInfo.content.trim()
  // 规范化，去除多余的空格
  if (postInfo.contentType == 0) {
    const ubb_link_regex = /\[url\]\s*(.*?)\s*\[\/url\]/ig
    regex_content = regex_content.replace(ubb_link_regex, `[url]$1[/url]`)
    const ubb_image_regex = /\[img\]\s*(.*?)\s*\[\/img\]/ig
    regex_content = regex_content.replace(ubb_image_regex, `[img]$1[/img]`)
  } else {
    const markdown_link_regex = /([^!])\[.*?\]\(\s*(.*?)\s*\)/ig
    regex_content = regex_content.replace(markdown_link_regex, `$1[]($2)`)
    const markdown_image_regex = /!\[.*?\]\(\s*(.*?)\s*\)/ig
    regex_content = regex_content.replace(markdown_image_regex, `![]($1)`)
  }
  // 对那些未使用[url]或md标签的链接进行改造
  const http_regex = /([^\[\]\(\)=]|^)(http[s]?\:\/\/?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.*[a-zA-Z]{2,6}[a-zA-Z0-9\.\&\/\?\:@\-_=#%~]*)/ig
  if (postInfo.contentType === 0) {
    regex_content = regex_content.replace(http_regex, `$1[url=$2]$2[/url]`)
  } else {
    regex_content = regex_content.replace(http_regex, `$1[$2]($2)`)
  }

  // markdown下的图片进行改造
  const markdown_image_regex = /!\[.*?\]\((.*?)\)/ig
  if (postInfo.contentType === 1) {
    regex_content = regex_content.replace(markdown_image_regex, `<CustomImageComponent originalSrc="$1" compressSrc="${useCompress ? `$1?compress=true&width=${IMG_COMPRESS_WIDTH}` : '$1?compress=false'}" />`)
  }

  // 分享模式禁止跳转
  if (window.location.pathname.startsWith('/share')) {
    const ubb_link_regex = /\[url.*?\].*?\[\/url\]/ig
    const markdown_link_regex = /([^!])\[.*?\]\(.*?\)/ig
    if (postInfo.contentType === 0) regex_content = regex_content.replace(ubb_link_regex, '[url]分享模式禁止跳转[/url]')
    else regex_content = regex_content.replace(markdown_link_regex, `$1[分享模式禁止跳转](${window.location.href})`)
  }

  const content = postInfo.contentType === 0 ? UBBReact(regex_content) : Markdown(regex_content)

  return (
    <PhotoProvider
      toolbarRender={({ images, rotate, onRotate, onScale, scale, index }) => {
        return (
          <>
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
