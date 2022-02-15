import LoadingCircle from '@/components/LoadingCircle'
import muiStyled from '@/muiStyled'
import { getHomeInfo } from '@/services/global'
import { Divider, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'


const Title = muiStyled(Typography).attrs({
  align: 'center',
  variant: 'h6',
  color: 'textPrimary',
})({
  marginTop: 16,
  marginBottom: 16,
})

const TableCellS = muiStyled(TableCell).attrs({
  align: 'center',
})({
})

export { Title }

interface RowType {
  name: string,
  data: number | string
}

export default () => {
  const [rows, setRows] = useState<RowType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getHomeInfo().then(res =>
      res.fail().succeed(info => {
        setRows([
          { name: '今日帖数', data: info.todayCount },
          { name: '今日主题数', data: info.todayTopicCount },
          { name: '论坛总主题数', data: info.topicCount },
          { name: '论坛总回复数', data: info.postCount },
          { name: '论坛总用户数', data: info.userCount },
          { name: '在线用户数', data: info.onlineUserCount },
          { name: '最新加入用户', data: info.lastUserName },
          { name: '更新时间', data: `${dayjs(info.lastUpdateTime).format('YYYY/MM/DD HH:mm')}` }
        ])
        setIsLoading(false)
      }
      )
    )
  }, [])


  return (
    <>
      <Title>论坛统计</Title>
      <Divider />
      {isLoading && <LoadingCircle />}

      {!isLoading && rows &&
        <Table>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCellS>{row.name}</TableCellS>
                <TableCellS>{row.data}</TableCellS>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </>
  )
}
