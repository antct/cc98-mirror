import React from 'react'
import img404 from '@/assets/error.png'
import InfiniteList from '@/components/InfiniteList'
import { MAX_WIDTH } from '@/config'
import { useInfListFix } from '@/hooks/useInfList'
import ListS from '@/hotfix/List'
import { getRecentMessage } from '@/services/message'
import styled from 'styled-components'
import ListItemList from './components/ListItemList'


const Img = styled.img`
  width: 60%;
  max-width: ${MAX_WIDTH}px;
`
const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const EmtpyList = () => (
  <CenterDiv>
    <Img src={img404} />
  </CenterDiv>
)


export default () => {
  const [recentList, state, callback, loaded] = useInfListFix(getRecentMessage)
  const { isEnd, isLoading } = state

  return (
    <ListS>
      {isEnd && recentList.length === 0 && <EmtpyList />}
      <InfiniteList isEnd={isEnd} isLoading={isLoading} callback={callback}>
        <ListItemList data={recentList} func={loaded} />
      </InfiniteList>
    </ListS>
  )
}
