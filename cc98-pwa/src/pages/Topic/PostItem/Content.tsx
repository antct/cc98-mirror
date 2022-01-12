import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { UBBReact } from '@/UBB'
import { IPost } from '@cc98/api'
import { Typography } from '@material-ui/core'
import React from 'react'
import MarkdownView, { ShowdownExtension } from 'react-showdown'

// TODO LazyLoad
const compressImageExtension: ShowdownExtension = {
  type: 'output',
  filter: (html: string, converter: any, options: any) => {
    let regex = /<img.*?src="(.*?)".*?\/>/g
    return html.replace(regex, `<img src="$1?compress=${options.useCompress}" ondblclick="this.src='$1?compress=false'" />`)
  }
}

function Markdown(content: string, useCompress: boolean) {
  return <MarkdownView
    markdown={content}
    dangerouslySetInnerHTML={true} // 确保ondblclick生效
    options={{ tables: true, emoji: true, useCompress: useCompress }}
    extensions={compressImageExtension}
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

  // 对那些未使用[url]或md标签的链接进行改造
  const regex = /([^\[\]\(\)=]|^)(http[s]?\:\/\/?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.*[a-zA-Z]{2,6}[a-zA-Z0-9\.\&\/\?\:@\-_=#%~]*)/ig
  let regex_content = postInfo.content.trim()
  if (postInfo.contentType === 0) {
    regex_content = regex_content.replace(regex, `$1[url=$2]$2[/url]`)
  } else {
    regex_content = regex_content.replace(regex, `$1[$2]($2)`)
  }
  const ubb_regex = /\[url.*?\].*?\[\/url\]/ig
  const markdown_regex = /([^!])\[.*?\]\(.*?\)/ig
  if (window.location.pathname.startsWith('/share')) {
    if (postInfo.contentType === 0) regex_content = regex_content.replace(ubb_regex, '[url]分享模式禁止跳转[/url]')
    else regex_content = regex_content.replace(markdown_regex, `$1[分享模式禁止跳转](${window.location.href})`)
  }
  const content = postInfo.contentType === 0 ? UBBReact(regex_content) : Markdown(regex_content, useCompress)

  return <TypographyS>{content}</TypographyS>
}
