import LoadingCircle from '@/components/LoadingCircle'
import muiStyled from '@/muiStyled'
import { getUsersInfoByIds } from '@/services/user'
import { navigate } from '@/utils/history'
import { IUser } from '@cc98/api'
import { Avatar, CardHeader, Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Title } from './SiteInfo'


const CardHeaderS = muiStyled(CardHeader)({
  width: 200,
  margin: '0 auto'
})

interface Props {
  userInfo: IUser
}

const DevCard: React.FC<Props> = ({ userInfo }) => (
  <CardHeaderS
    avatar={<Avatar src={userInfo.portraitUrl} />}
    title={<Typography color="textPrimary">{userInfo.name}</Typography>}
    subheader={userInfo.introduction}
    onClick={() => navigate(`/user/${userInfo.id}`)}
  />
)

const CardFlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default () => {
  const ids = [5298, 531603]
  const descriptions = [
    'CC98 PWA 团队',
    '梦想改造家'
  ]

  const [usersInfo, setUsersInfo] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUsersInfoByIds(ids).then(usersTry =>
      usersTry.fail().succeed(users => {
        if (users.length === ids.length) {
          const usersInfo = ids.map((id, i) => {
            const user = users.find(u => u.id === id) as IUser
            user.introduction = descriptions[i]

            return user
          })
          
          setUsersInfo(usersInfo)
          setIsLoading(false)
        }
      })
    )
  }, [])

  return (
    <>
      <Title>开发人员</Title>
      <Divider />
      {isLoading && <LoadingCircle />}

      <CardFlexDiv>
        {usersInfo.map(userInfo => (
          <DevCard key={userInfo.id} userInfo={userInfo} />
        ))}
      </CardFlexDiv>
    </>
  )
}
