import React from 'react'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'

import useFetcher from '@/hooks/useFetcher'

import styled from 'styled-components'
import img404 from '@/assets/error.png'

import { IUser } from '@cc98/api'
import { getUserInfoById, getUserInfoByName } from '@/services/user'

import UserAvatar from './UserAvatar'
import UserSignature from './UserSignature'
import UserDetail from './UserDetail'
import UserRecentTopics from './UserRecentTopics'
import UserRecentPosts from './UserRecentPosts'

const Img = styled.img`
  width: 60%;
  max-width: 600px;
`
const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

/**
 * 空列表占位，表示 InfList 什么都没有
 */
const EmtpyList = () => (
  <CenterDiv>
    <Img src={img404} />
  </CenterDiv>
)


interface Props {
  info: IUser
  isUserCenter: boolean
}

const UserCenter: React.FC<Props> = ({ info, isUserCenter }) => (
  <>
    <UserAvatar info={info} isUserCenter={isUserCenter} />
    <UserDetail info={info} />
    <UserSignature info={info} />
    <UserRecentTopics info={info} isUserCenter={isUserCenter} />
    {isUserCenter && <UserRecentPosts />}
  </>
)

interface WrapperProps {
  /**
   * 来自路由
   */
  id?: string
  name?: string
}

const Wrapper: React.FC<WrapperProps> = props => {
  const { myInfo } = useModel(userModel, ['myInfo'])

  if (props.id) {
    const [userInfo] = useFetcher(props.id ? () => getUserInfoById(props.id as string) : null)
    return userInfo && <UserCenter info={userInfo} isUserCenter={false} />
  } else if (props.name) {
    const [userInfo] = useFetcher(props.name ? () => getUserInfoByName(props.name as string) : null)
    return userInfo && <UserCenter info={userInfo} isUserCenter={false} />
  } else {
    return myInfo && <UserCenter info={myInfo} isUserCenter={true} />
  }
}

export default Wrapper
