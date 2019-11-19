import React from 'react'
import styled from 'styled-components'

import useInfList, { Service as InfService } from '@/hooks/useInfList'
import useFetcher, { Service as FinService } from '@/hooks/useFetcher'
import useDelay from '@/hooks/useDelay'

import UserList from './UserList'
import img404 from '@/assets/error.png'

import InfiniteList from '@/components/InfiniteList'
import LoadingCircle from '@/components/LoadingCircle'

import { navigateHandler } from '@/services/utils/errorHandler'

import { IUser } from '@cc98/api'

const Img = styled.img`
  width: 60%;
  max-width: 600px;
`
const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

/**
 * 空列表占位，表示 InfList 什么都没有
 */
const EmtpyList = () => (
  <CenterDiv>
    <Img src={img404} />
  </CenterDiv>
)

interface InfProps {
  service: InfService<IUser[]>
}

const InfUserList: React.FC<InfProps> = ({ service }) => {
  const [data, state, callback] = useInfList(service, {
    fail: navigateHandler,
  })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && data.length === 0 && <EmtpyList />}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <UserList data={data} />
      </InfiniteList>
    </>
  )
}

export default InfUserList
