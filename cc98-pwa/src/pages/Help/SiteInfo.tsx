import LoadingCircle from '@/components/LoadingCircle'
import muiStyled from '@/muiStyled'
import { getDailyCountInfo, getHomeInfo, getMonthlyCountInfo } from '@/services/global'
import { ICountData } from '@cc98/api'
import {
  ArgumentAxis, Chart,
  LineSeries, ValueAxis
} from '@devexpress/dx-react-chart-material-ui'
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
  const [dailyRows, setDailyRows] = useState<ICountData[]>([])
  const [monthlyRows, setMonthlyRows] = useState<ICountData[]>([])
  const [isDailyLoading, setIsDailyLoading] = useState(false)
  const [isMonthlyLoading, setIsMonthlyLoading] = useState(false)

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
    setIsDailyLoading(true)
    setIsMonthlyLoading(true)
    getDailyCountInfo(0, 14).then(res =>
      res.fail().succeed(info => {
        let data = info.data.reverse()
        for (let i = 0; i < data.length; i++) {
          data[i].date = dayjs(data[i].date).format('MM-DD')
        }
        setDailyRows(data)
        setIsDailyLoading(false)
      })
    )
    getMonthlyCountInfo(0, 12).then(res =>
      res.fail().succeed(info => {
        let data = info.data.reverse()
        for (let i = 0; i < data.length; i++) {
          data[i].date = dayjs(data[i].date).format('YY-MM')
        }
        setMonthlyRows(data)
        setIsMonthlyLoading(false)
      })
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
      <Title>日活统计</Title>
      <Divider />
      {isDailyLoading && <LoadingCircle />}

      {!isDailyLoading && dailyRows &&
        <Chart
          data={dailyRows}
        >
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField="userCount" argumentField="date" />
        </Chart>
      }
      <Title>月活统计</Title>
      <Divider />
      {isMonthlyLoading && <LoadingCircle />}

      {!isMonthlyLoading && monthlyRows &&
        <Chart
          data={monthlyRows}
        >
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField="userCount" argumentField="date" />
        </Chart>
      }
    </>
  )
}
