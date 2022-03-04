import { IPost, IUser } from '@cc98/api'
import React from 'react'
import styled from 'styled-components'
import IconActions from './Actions/IconActions'
import MemuActions from './Actions/MemuActions'

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
   * 是否追踪
   */
  isTrace: boolean
  isShare: boolean
  /**
   * 更新 Post 信息
   */
  refreshPost: () => void
}

const Actions: React.FC<Props> = ({ postInfo, isTrace, isShare, refreshPost, userInfo }) => (
  <FlexDiv>
    <IconActions
      postInfo={postInfo}
      refreshPost={refreshPost}
      isShare={isShare}
    />
    <MemuActions
      postInfo={postInfo}
      userInfo={userInfo}
      refreshPost={refreshPost}
      isTrace={isTrace}
      isShare={isShare}
    />
  </FlexDiv>
)

export default Actions
