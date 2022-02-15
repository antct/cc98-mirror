import LoadingCircle from '@/components/LoadingCircle'
import muiStyled from '@/muiStyled'
import { getProxy } from '@/services/global'
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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getProxy().then(res =>
      res.fail().succeed(info => {
        setRows([
          { name: '鉴权服务', data: info.cc98_token_url },
          { name: 'API接口', data: info.cc98_api_url },
          { name: '文件服务', data: info.cc98_file_url },
          { name: '图片服务', data: info.cc98_image_url },
        ])
        setIsLoading(false)
      }
      )
    )
  }, [])


  return (
    <>
      <Title>论坛代理</Title>
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
