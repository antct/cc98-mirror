import InfiniteList from '@/components/InfiniteList'
import { useInfListFix } from '@/hooks/useInfList'
import muiStyled from '@/muiStyled'
import { getMessageContent, sendMessage } from '@/services/message'
import { List } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import DetailItemList from './components/DetailItemList'
import Editor from './Editor'

const ListS = muiStyled(List)({
  width: '100vw',
  maxWidth: 600,
  position: 'absolute',
  top: 56,
  bottom: 80,
  padding: '8px 0',
})

const FixBottomDiv = styled.div`
  position: fixed;
  width: 100vw;
  max-width: 600px;
  left: auto;
  right: auto;
  bottom: 0px;
`
interface Props {
  /**
   * 联系人id (from url)
   */
  id: string
}

export default ({ id }: Props) => {
  const [messageListKey, setMessageListKey] = useState(0)

  return (
    <MessageList
      key={messageListKey}
      id={id}
      refresh={() => setMessageListKey(messageListKey + 1)}
    />
  )
}

/**
 * 私信-会话列表
 */
const MessageList = ({ id, refresh }: Props & { refresh: () => void }) => {
  const service = (from: number) => getMessageContent(id, from, 20)
  const [list, state, callback, loaded] = useInfListFix(service, {
    step: 20,
  })

  const { isLoading, isEnd } = state

  const sendMsg = (content: string) => {
    sendMessage(id, content).then(res => {
      res.fail().succeed(_ => {
        refresh()
      })
    })
  }

  return (
    <>
      <ListS>
        <InfiniteList
          reverse
          inFixedContainer
          isEnd={isEnd}
          isLoading={isLoading}
          callback={callback}
        >
          <DetailItemList data={list} func={loaded}></DetailItemList>
        </InfiniteList>
      </ListS>

      <FixBottomDiv>
        <Editor callback={sendMsg} />
      </FixBottomDiv>
    </>
  )
}
