import React, { useState, useEffect } from 'react'
import muiStyled from '@/muiStyled'
import styled from 'styled-components'

import { Paper, Divider, Typography } from '@material-ui/core'

import Header from './Header'
import Content from './Content'
import Actions from './Actions'
import Awards from './Awards'
import UBB from '@/UBB'

import { getSinglePost } from '@/services/post'
import { IPost, IUser, ITopic } from '@cc98/api'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import {IVote} from '../PostList'

import remark from 'remark'
import remark2react from 'remark-react'

function Markdown(content: string) {
  return remark()
    .use(remark2react)
    .processSync(content).contents
}

const Wrapper = muiStyled(Paper).attrs({
  square: true,
  elevation: 0,
})({
  marginTop: 6,
})

const WrapperDiv = styled.div`
  margin: 8px 16px;
`

const TypographyS = muiStyled(Typography).attrs({
  component: 'div',
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
  /**
   * 用户信息
   */
  userInfo: IUser | undefined
  /**
   * 是否热帖
   */
  isHot?: boolean
  /**
   * 是否追踪
   */
  isTrace?: boolean
  isShare: boolean
  /**
   * 投票信息
   */
  voteInfo?: IVote | undefined
}

const DELETE_CONTENT = '该贴已被 my CC98, my home'

export default ({ postInfo, userInfo, isHot, isTrace = false, isShare, voteInfo=undefined }: Props) => {
  const [currentPost, setCurrentPost] = useState<IPost>(postInfo)
  const { useSignature } = useModel(settingModel, ['useSignature'])
  if (postInfo.isDeleted) {
    postInfo.content = DELETE_CONTENT
  }

  const refreshPost = async () => {
    const res = await getSinglePost(postInfo.topicId, postInfo.floor)
    res.fail().succeed(post => {
      if (post.isDeleted) {
        post.content = DELETE_CONTENT
        if (userInfo) {
          userInfo.portraitUrl = ''
        }
      }
      setCurrentPost(post)
    })
  }

  return (
    <Wrapper>
      <Header postInfo={currentPost} userInfo={userInfo} isHot={isHot} isShare={isShare} />
      {
        voteInfo &&
        (function () {
          let content = '```text\n'
          content += `投票详情（共有${voteInfo.voteUserCount}人参与投票，暂不支持投票）：\n`
          voteInfo.voteItems.map((item, index) => {
            content += `\t${index+1}. ${item.description}（${item.count}人/${(100 * item.count/(voteInfo.voteUserCount || 1)).toFixed(2)}%）`
            content += '\n'
          })
          content += '```'
          content = Markdown(content)
          return <TypographyS>{content}</TypographyS>
        })()
      }
      <Content postInfo={currentPost} />
      {
        // !isShare &&
        <Actions
          postInfo={currentPost}
          userInfo={userInfo}
          isTrace={isTrace}
          refreshPost={refreshPost}
        />
      }
      {useSignature && userInfo !== undefined && userInfo.signatureCode &&
        (
          <>
            <Divider />
            <WrapperDiv>
              <UBB ubbText={userInfo.signatureCode} />
            </WrapperDiv>
          </>
        )
      }
      <Awards
        key={currentPost.awards ? currentPost.awards.length : 0}
        awards={currentPost.awards}
      />
      <Divider />
    </Wrapper>
  )
}
