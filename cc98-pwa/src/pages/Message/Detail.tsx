import InfiniteList from '@/components/InfiniteList'
import { BIG_MAX_WIDTH, IS_PC, MAX_WIDTH, PC_WIDTH } from '@/config'
import { useInfListFix } from '@/hooks/useInfList'
import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'
import { getMessageContent, sendMessage } from '@/services/message'
import List, { ListProps as ListProps } from '@mui/material/List'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import DetailItemList from './components/DetailItemList'
import Editor from './Editor'


interface ListSProps extends ListProps {
  open?: boolean;
}

const PCListS = styled(List, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ListSProps>(({ theme, open }) => ({
  width: BIG_MAX_WIDTH,
  top: 56,
  bottom: 80,
  position: 'absolute',
  padding: '8px 0',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: MAX_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

interface DivProps {
  open?: boolean;
}

const PCFixBottomDiv = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<DivProps>(({ theme, open }) => ({
  position: 'fixed',
  left: 'auto',
  right: 'auto',
  bottom: 0,
  width: BIG_MAX_WIDTH,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: MAX_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const ListS = styled(List)({
  width: '100vw',
  maxWidth: PC_WIDTH,
  position: 'absolute',
  top: 56,
  bottom: 80,
  padding: '8px 0',
})

const FixBottomDiv = styled('div')(({ theme }) => ({
  position: 'fixed',
  width: '100vw',
  maxWidth: PC_WIDTH,
  left: 'auto',
  right: 'auto',
  bottom: 0
}))

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
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
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
      {
        IS_PC ?
          <>
            <PCListS open={isDrawerOpen}>
              <InfiniteList
                reverse
                inFixedContainer
                isEnd={isEnd}
                isLoading={isLoading}
                callback={callback}
              >
                <DetailItemList data={list} func={loaded}></DetailItemList>
              </InfiniteList>
            </PCListS>

            <PCFixBottomDiv open={isDrawerOpen}>
              <Editor callback={sendMsg} />
            </PCFixBottomDiv>
          </>
          :
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
      }
    </>
  )
}
