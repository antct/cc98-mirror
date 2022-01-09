import InfiniteList from '@/components/InfiniteList'
import { useInfListFix } from '@/hooks/useInfList'
import { getRecentMessage } from '@/services/message'
import { List } from '@material-ui/core'
import React from 'react'
import ListItemList from './components/ListItemList'

/**
 * 私信-联系人列表
 */
export default () => {
  const [recentList, state, callback, loaded] = useInfListFix(getRecentMessage)
  const { isEnd, isLoading } = state

  return (
    <List>
      <InfiniteList isEnd={isEnd} isLoading={isLoading} callback={callback}>
        {/* {recentList.map(item => (
          <ListItem key={item.userId} message={item} />
        ))} */}
        <ListItemList data={recentList} func={loaded}/>
      </InfiniteList>
    </List>
  )
}
