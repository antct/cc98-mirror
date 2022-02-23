import useFetcher, { Service } from '@/hooks/useFetcher'
import { IPost } from '@cc98/api'
import React from 'react'
import PostItem from './PostItem'
import { useUserMap } from './PostList'


interface Props {
  service: Service<IPost[]>
  isShare: boolean
}

const PostListHot = ({ service, isShare }: Props) => {
  const [userMap, updateUserMap] = useUserMap()
  const [posts] = useFetcher(service, {
    success: updateUserMap,
  })

  return (
    <>
      {posts && posts.map((info: IPost) => (
        <PostItem
          key={info.id}
          postInfo={info}
          userInfo={userMap[info.userId]}
          isHot
          isShare={isShare}
        />
      ))}
    </>
  )
}

export default PostListHot