import img404 from '@/assets/error.png'
import LoadingCircle from '@/components/LoadingCircle'
import useDelay from '@/hooks/useDelay'
import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import { getUserInfoListById, getUserInfoListByName } from '@/services/user'
import { IUser } from '@cc98/api'
import React from 'react'
import styled from 'styled-components'
import UserAvatar from './UserAvatar'
import UserDetail from './UserDetail'
import UserHotPosts from './UserHotPosts'
import UserIntroduction from './UserIntroduction'
import UserRecentPosts from './UserRecentPosts'
import UserRecentTopics from './UserRecentTopics'
import UserSignature from './UserSignature'


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
    <UserIntroduction info={info} />
    <UserSignature info={info} />
    <UserRecentTopics info={info} isUserCenter={isUserCenter} />
    {isUserCenter && <UserRecentPosts />}
    {isUserCenter && <UserHotPosts />}
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
  const isResolve = useDelay(300)

  if (props.id) {
    const [userInfo] = useFetcher(props.id ? () => getUserInfoListById(props.id as string) : null)
    if (userInfo === null || !isResolve) {
      return <LoadingCircle />
    }
    return userInfo && <UserCenter info={userInfo[0]} isUserCenter={false} />
  } else if (props.name) {
    // 这个接口无法显示IP
    const [userInfo] = useFetcher(props.name ? () => getUserInfoListByName(props.name as string) : null)
    if (userInfo === null || !isResolve) {
      return <LoadingCircle />
    }
    return userInfo && <UserCenter info={userInfo[0]} isUserCenter={false} />
  } else {
    if (myInfo === null || !isResolve) {
      return <LoadingCircle />
    }
    return myInfo && <UserCenter info={myInfo} isUserCenter={true} />
  }
}

export default Wrapper
