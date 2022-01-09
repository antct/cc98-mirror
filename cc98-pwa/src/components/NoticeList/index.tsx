import img404 from '@/assets/error.png'
import InfiniteList from '@/components/InfiniteList'
import useInfList, { Service as InfService, useInfListFix } from '@/hooks/useInfList'
import { navigateHandler } from '@/services/utils/errorHandler'
import { IReply, ISystem } from '@cc98/api'
import React from 'react'
import styled from 'styled-components'
import ReplyList from './ReplyList'
import SystemList from './SystemList'


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

interface InfSystemProps {
  service: InfService<ISystem[]>
}

const InfSystemList: React.FC<InfSystemProps> = ({ service }) => {
  const [data, state, callback] = useInfList(service, {
    fail: navigateHandler,
  })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && data.length === 0 && <EmtpyList />}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <SystemList data={data} />
      </InfiniteList>
    </>
  )
}

interface InfReplyProps {
  service: InfService<IReply[]>
}

const InfReplyList: React.FC<InfReplyProps> = ({ service }) => {
  const [data, state, callback, loaded] = useInfListFix(service, {
    fail: navigateHandler,
  })
  const { isLoading, isEnd } = state

  return (
    <>
      {isEnd && data.length === 0 && <EmtpyList />}
      <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={callback}>
        <ReplyList data={data} func={loaded}/>
      </InfiniteList>
    </>
  )
}


export { InfSystemList, InfReplyList }
