import ListS from '@/hotfix/List'
import { IPost } from '@cc98/api'
import React from 'react'
import SearchListItem, { Place } from './SearchListItem'

interface IUrlMap {
  [key: number]: string
}

interface Props {
  posts: IPost[]
  place: Place
  urlMap: IUrlMap
}

const SearchList: React.FC<Props> = ({ posts, place, urlMap }) => {
  return (
    <ListS>
      {posts.map(info => (
        <SearchListItem key={info.id} data={info} place={place} portraitUrl={urlMap[info.userId]} />
      ))}
    </ListS>
  )
}

export default SearchList
