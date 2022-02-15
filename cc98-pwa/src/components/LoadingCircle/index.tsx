import { CircularProgress } from '@mui/material'
import React from 'react'
import styled from 'styled-components'


const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`

const LoadingCircle: React.FC = () => (
  <WrapperDiv>
    {/* <CircularProgress disableShrink /> */}
    <CircularProgress />
  </WrapperDiv>
)

export default LoadingCircle
