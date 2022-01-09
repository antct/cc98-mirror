import useFetcher, { Service } from '@/hooks/useFetcher'
import { IPost } from '@cc98/api'
import React from 'react'
import PostItem from './PostItem'
import { useUserMap } from './PostList'


interface Props {
  service: Service<IPost[]>
  isShare: boolean
}

export default ({ service, isShare }: Props) => {
  const [userMap, updateUserMap] = useUserMap()

  const [posts] = useFetcher(service, {
    success: updateUserMap,
  })

  if (posts === null) {
    return null
  }

  return (
    <>
      {posts.map((info: IPost) => (
        <PostItem key={info.id} postInfo={info} userInfo={userMap[info.userId]} isHot isShare={isShare}/>
      ))}
    </>
  )
}
