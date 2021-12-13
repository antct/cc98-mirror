import React, { useState } from 'react'
import muiStyled from '@/muiStyled'
import styled from 'styled-components'

import { Paper, Divider } from '@material-ui/core'

import Header from './Header'
import Content from './Content'
import Actions from './Actions'
import Awards from './Awards'
import UBB from '@/UBB'

import { getSinglePost } from '@/services/post'
import { IPost, IUser } from '@cc98/api'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

const Wrapper = muiStyled(Paper).attrs({
  square: true,
  elevation: 0,
})({
  marginTop: 6,
})

const WrapperDiv = styled.div`
  margin: 8px 16px;
`

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
}

const DELETE_CONTENT = '该贴已被 my CC98, my home'

export default ({ postInfo, userInfo, isHot, isTrace = false, isShare }: Props) => {
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
