import LoadingCircle from '@/components/LoadingCircle'
import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { Divider, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
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
  const [isLoading, setIsLoading] = useState(true)
  const { myInfo } = useModel(userModel)
  const activityPoint = myInfo?.activityPoint

  useEffect(() => {
    if (!activityPoint) return
    setRows([
      { name: '活跃分', data: activityPoint.point },
      { name: '原始分', data: activityPoint.rawPoint },
      { name: '奖励分', data: activityPoint.bonus },
      { name: '评估时间', data: activityPoint.month },
      { name: '增加主题', data: activityPoint.topic },
      { name: '增加回复', data: activityPoint.post },
      { name: '增加赞数', data: activityPoint.like },
      { name: '正向风评', data: activityPoint.rate }
    ])
    setIsLoading(false)
  }, [activityPoint])

  return (
    <>
      <Title>活跃度</Title>
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
