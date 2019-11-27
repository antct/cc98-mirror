import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'

import LoadingCircle from '@/components/LoadingCircle'

import { navigate } from '@/utils/history'

import { Avatar, CardHeader, Divider, Typography } from '@material-ui/core'

import { getUsersInfoByIds } from '@/services/user'
import { IUser } from '@cc98/api'

import { Title } from './SiteInfo'

const CardHeaderS = muiStyled(CardHeader)({
  width: '48%',
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
    '低级魔法改造师'
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
      <Title>开发组</Title>
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
