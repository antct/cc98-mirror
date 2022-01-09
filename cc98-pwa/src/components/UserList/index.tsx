import img404 from '@/assets/error.png'
import InfiniteList from '@/components/InfiniteList'
import { Service as InfService, useInfListFix } from '@/hooks/useInfList'
import { navigateHandler } from '@/services/utils/errorHandler'
import React from 'react'
import styled from 'styled-components'
import UserList from './UserList'
import { Place } from './UserListItem'


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
  service: InfService<number[]>
  place: Place
}

const InfUserList: React.FC<InfProps> = ({ service, place }) => {
  const [data, state, callback, loaded] = useInfListFix(service, {
    fail: navigateHandler,
  })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && data.length === 0 && <EmtpyList />}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <UserList data={data} place={place} func={loaded}/>
      </InfiniteList>
    </>
  )
}

export { InfUserList }
