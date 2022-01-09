import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { getTopicList } from '@/services/topic'
import { IPost, IReply, ITopic } from '@cc98/api'
import { List } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ReplyListItem from './ReplyListItem'


const ListS = muiStyled(List)({
  width: '100%',

})

interface ItemProps {
  data: IReply[]
  topicList: ITopic[]
}

export const ReplyList: React.FC<ItemProps> = ({ data, topicList }) => (
  <ListS>
    {data.map((x, index) => (
      <ReplyListItem key={x.id} data={x} topic={topicList[index]} />
    ))}
  </ListS>
)

interface Props {
  data: IReply[]
  func: () => void
}

export default ({ data, func }: Props) => {
  const [postList, setPostList] = useState<IPost[]>([])
  const [topicList, setTopicList] = useState<ITopic[]>([])
  const { FRESH_READ } = userModel
  const { useNotification } = useModel(settingModel, ['useNotification'])
  const size = 20

  function callback() {
    let flag = false
    let offset = data.length % size === 0 ? 20 : data.length % size
    let fromPos = data.length - offset
    if (fromPos < 0) {
      return null
    }
    let nextData = data.slice(fromPos)
    // getPostList(nextData).then(res => {
    //   res
    //     .fail(err => { })
    //     .succeed(list => {
    //       let fixList = nextData.map(x => list.filter(y => y.id === x.postId)[0])
    //       setPostList(prevList => prevList.concat(fixList))
    //       if (!flag) {
    //         flag = true
    //         return
    //       } else {
    //         func()
    //         if (useNotification && data && data.length) {
    //           FRESH_READ()
    //         }
    //       }
    //     })
    // })
    getTopicList(nextData).then(res => {
      res
        .fail(err => { })
        .succeed(list => {
          let fixList = nextData.map(x => list.filter(y => y.id === x.topicId)[0])
          setTopicList(prevList => prevList.concat(fixList))
          func()
          if (useNotification && data && data.length) {
            FRESH_READ()
          }
        })
    })
  }

  useEffect(() => {
    callback()
  }, [data])

  return (
    <ReplyList
      data={data}
      topicList={topicList}
    />
  )
}

// export default ReplyList
