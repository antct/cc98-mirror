import Board from '@/pages/Board'
import BoardRecord from '@/pages/Board/BoardRecord'
import BoardQuietRoom from '@/pages/Board/QuietRoom'
import BoardList from '@/pages/BoardList'
import Editor from '@/pages/Editor'
import Error from '@/pages/Error'
import Friend from '@/pages/Friend'
import Help from '@/pages/Help'
import History from '@/pages/History'
import Home from '@/pages/Home'
import HotTopic from '@/pages/HotTopic'
import Index from '@/pages/Index'
import LogIn from '@/pages/LogIn'
import MessageDetail from '@/pages/Message/Detail'
import MessageList from '@/pages/Message/List'
import MyFollow from '@/pages/MyFollow'
import NewTopic from '@/pages/NewTopic'
import Notice from '@/pages/Notice'
import Search from '@/pages/Search'
import Setting from '@/pages/Setting'
import Topic, { TopicReverse } from '@/pages/Topic'
import UserCenter from '@/pages/UserCenter'
import UserCenterEdit from '@/pages/UserCenter/Edit'
// https://reach.tech/router/api/Router
import { RouteComponentProps, Router, WindowLocation } from '@reach/router'
import React from 'react'


export const Route: React.FC<
  RouteComponentProps & {
    // @types/react 里 createElement 签名很混乱
    component: any
    // component: React.FC<any>
  }
> = props => {
  const { path, component, ...otherProps } = props

  return React.createElement(component, otherProps)
}

export interface ILocation {
  location: WindowLocation
}

const MyRouter: React.FC<ILocation> = ({ location }) => (
  <Router location={location}>
    <Route path="/" component={Home} />

    <Route path="help/*" component={Help} />

    <Route path="hotTopics" component={HotTopic} />
    <Route path="newTopics" component={NewTopic} />

    <Route path="topic/:topicId" component={Topic} />
    <Route path="topic/:topicId/:page" component={Topic} />
    <Route path="topic/:topicId/reverse" component={TopicReverse} />
    <Route path="topic/:topicId/trace/:postId" component={Topic} />

    <Route path="share/:shareId" component={Topic} />

    <Route path="myFollow" component={MyFollow} />
    <Route path="notice" component={Notice} />
    <Route path="friend" component={Friend} />
    <Route path="search" component={Search} />

    <Route path="boardList" component={BoardList} />
    <Route path="board/:id" component={Board} />
    <Route path="board/:id/record" component={BoardRecord} />
    <Route path="board/:id/quietRoom" component={BoardQuietRoom} />

    <Route path="userCenter" component={UserCenter} />
    <Route path="userCenter/edit" component={UserCenterEdit} />
    <Route path="user/:id" component={UserCenter} />
    <Route path="user/name/:name" component={UserCenter} />

    <Route path="index" component={Index} />

    <Route path="editor/postTopic/:boardId" component={Editor} />
    <Route path="editor/replyTopic/:boardId/:topicId/" component={Editor} />
    <Route path="editor/replyTopic/:boardId/:topicId/quote/:floor" component={Editor} />
    <Route path="editor/edit/:boardId/:postId" component={Editor} />

    <Route path="history" component={History} />

    <Route path="setting" component={Setting} />
    <Route path="messageList" component={MessageList} />
    <Route path="messageDetail/:id" component={MessageDetail} />

    <Route path="logIn" component={LogIn} />
    <Route path="error/*" component={Error} />
    <Route default component={Error} />
  </Router>
)

export default React.memo(({ location }: ILocation) => <MyRouter location={location} />)
