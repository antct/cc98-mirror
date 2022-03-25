import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getUsersInfoByNames } from '@/services/user'
import { navigate } from '@/utils/history'
import { IAward, IUser } from '@cc98/api'
import { Avatar, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

const TableRowS = muiStyled(TableRow)({
  height: '2rem',
  padding: 0,
})

const CellLeft = muiStyled(TableCell)({
  minWidth: '5rem',
  maxWidth: '7rem',
  wordBreak: 'break-all',
  padding: 4,
  paddingLeft: 0,
})

const CellMiddle = CellLeft

const CellRight = muiStyled(TableCell)({
  '&:last-child': {
    padding: '4px 0',
  },
})

const CellShowMore = muiStyled(TableCell)({
  padding: '8px 0',
  textAlign: 'center',
  cursor: 'pointer',
})

interface Props {
  awards: IAward[]
}

interface IUserMap {
  [key: string]: IUser
}

function useUserMap() {
  const [userMap, setUserMap] = useState<IUserMap>({})

  const updateUserMap = async (list: IAward[]) => {
    if (list.length == 0) return null
    let userIds = list.map(p => p.operatorName).filter(name => name)
    if (userIds.length == 0) return null
    const res = await getUsersInfoByNames(userIds)
    res.fail().succeed(users => {
      users.forEach(user => {
        userMap[user.name] = user
      })

      // react use Object.is algorithm for comparing
      setUserMap({ ...userMap })
    })
  }

  return [userMap, updateUserMap] as [typeof userMap, typeof updateUserMap]
}

// 显示的评分数，超出将默认折叠
const SHOW_AWARDS_NUM = 3

const Awards = ({ awards }: Props) => {
  const showExpanded = awards && awards.length > SHOW_AWARDS_NUM
  const [expanded, setExpanded] = useState(false)
  const { TRANS_IMG } = settingModel
  const [userMap, updateUserMap] = useUserMap()
  useEffect(() => {
    updateUserMap(awards)
  }, [])
  const showAwards = expanded ? awards : awards ? awards.slice(0, SHOW_AWARDS_NUM) : []

  return (
    <>
      {showAwards.map(award => (
        <TableRowS key={award.id}>
          <CellLeft>
            <LazyLoad height={'100%'} offset={200} once>
              <Avatar
                sx={{ display: 'inline-flex', verticalAlign: 'middle', width: 24, height: 24 }}
                src={userMap[award.operatorName] ? TRANS_IMG(userMap[award.operatorName].portraitUrl, true) : undefined}
                onClick={() => navigate(`/user/name/${award.operatorName}`)}
                children={false}
              />
              &nbsp;
              {award.operatorName}
            </LazyLoad>
          </CellLeft>
          <CellMiddle>{award.content}</CellMiddle>
          <CellRight>{award.reason}</CellRight>
        </TableRowS>
      ))}
      {showExpanded && !expanded && (
        <TableRowS>
          <CellShowMore colSpan={SHOW_AWARDS_NUM} onClick={() => setExpanded(true)}>
            展开剩余{awards ? awards.length - SHOW_AWARDS_NUM : 0}个评分
          </CellShowMore>
        </TableRowS>
      )}
    </>
  )
}

const AwardsTable: React.FC = ({ children }) => (
  <Table>
    <TableHead>
      <TableRowS>
        <CellLeft>评分人</CellLeft>
        <CellMiddle>操作</CellMiddle>
        <CellRight>理由</CellRight>
      </TableRowS>
    </TableHead>
    <TableBody>{children}</TableBody>
  </Table>
)

const WrapperDiv = styled.div`
  margin: 16px;
  margin-top: 0;
`

export default ({ awards }: Props) => {
  if (!awards || awards.length === 0) {
    return null
  }

  return (
    <WrapperDiv>
      <AwardsTable>
        <Awards awards={awards} />
      </AwardsTable>
    </WrapperDiv>
  )
}
