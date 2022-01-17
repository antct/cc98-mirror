import { IUser } from '@cc98/api'
import { Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'
import ExpandPanel from './ExpandPanel'


interface ListItemProps {
  name: string
  value: string | number
}

const ItemDiv = styled.div`
  padding: 10px 16px;
  width: 50%;
`

const ListItem: React.FC<ListItemProps> = ({ name, value }) => (
  <ItemDiv>
    <Typography color="textSecondary">{name}</Typography>
    <Typography>{value}</Typography>
  </ItemDiv>
)

const ListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  info: IUser
}

const RecentTopics: React.FC<Props> = ({ info }) => (
  <ExpandPanel defaultExpanded title="用户资料">
    <ListDiv>
      <ListItem name="性别" value={info.gender === 1 ? '男' : '女'} />
      <ListItem name="财富值" value={info.wealth} />
      <ListItem name="发帖" value={info.postCount} />
      <ListItem name="删贴" value={-1*info.deleteCount} />
      <ListItem name="关注" value={info.followCount} />
      <ListItem name="粉丝" value={info.fanCount} />
      <ListItem name="威望" value={info.prestige} />
      <ListItem name="风评" value={info.popularity} />
      <ListItem name="收到的赞" value={info.receivedLikeCount} />
      <ListItem name="生日" value={info.birthday && dayjs(info.birthday).format('YYYY/MM/DD')} />
      <ListItem name="QQ" value={info.qq} />
      <ListItem name="邮箱" value={info.emailAddress || ''} />
      <ListItem name="等级" value={info.levelTitle} />
      <ListItem name="IP" value={info.lastIpAddress || ''} />
      <ListItem name="注册时间" value={dayjs(info.registerTime).format('YYYY-MM-DD HH:mm')} />
      <ListItem name="最后登录" value={dayjs(info.lastLogOnTime).format('YYYY-MM-DD HH:mm')} />
    </ListDiv>
  </ExpandPanel>
)

export default RecentTopics
