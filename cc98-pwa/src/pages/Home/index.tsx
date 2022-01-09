import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import React from 'react'
import HotTopic from '../HotTopic'
import Index from '../Index'
import LogIn from '../LogIn'
import MyFollow from '../MyFollow'
import NewTopic from '../NewTopic'


export default () => {
  const user = useModel(userModel)
  const { customHome } = useModel(settingModel, ['customHome'])

  return (
    <>
      {user.isLogIn && (
        <>
          {customHome === 1 && <Index />}
          {customHome === 2 && <HotTopic />}
          {customHome === 3 && <NewTopic />}
          {customHome === 4 && <MyFollow />}
        </>
      )}
      {!user.isLogIn && (
        <>
          {<LogIn />}
        </>
      )}
    </>
  )
}
