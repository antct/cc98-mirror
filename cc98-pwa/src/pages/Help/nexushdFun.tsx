import LoadingCircle from '@/components/LoadingCircle'
import muiStyled from '@/muiStyled'
import { getFun } from '@/services/global'
import { IFun } from '@cc98/api'
import { Divider, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

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
  width: '100%',
  display: 'block'
})

const Img = styled.img`
  max-width: 100%;
`

export default () => {
  const [rows, setRows] = useState<IFun[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getFun().then(res =>
      res.fail().succeed(data => {
        setRows(data)
        setIsLoading(false)
      })
    )
  }, [])


  return (
    <>
      <Title>NexusHD趣味盒</Title>
      <Divider />
      {isLoading && <LoadingCircle />}

      {!isLoading && rows &&
        <Table>
          <TableBody>
            {rows.map(row => (
              <>
                <TableRow>
                  <TableCellS>{row.title}</TableCellS>
                </TableRow>
                <TableRow>
                  {row.img.map(src =>
                    <LazyLoad height={200} offset={200} once>
                      <TableCellS>
                        <Img src={src} />
                      </TableCellS>
                    </LazyLoad>)
                  }
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      }
    </>
  )
}
