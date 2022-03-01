import ListS from '@/hotfix/List'
import { IPost } from '@cc98/api'
import React from 'react'
import PostListItem, { Place } from './PostListItem'

interface IUrlMap {
  [key: number]: string
}

interface Props {
  posts: IPost[]
  place: Place
  urlMap: IUrlMap
}

const PostList: React.FC<Props> = ({ posts, place, urlMap }) => {
  return (
    <ListS>
      {posts.map(info => (
        <PostListItem key={info.id} data={info} place={place} portraitUrl={urlMap[info.userId]} />
      ))}
    </ListS>
  )
}

export default PostList
