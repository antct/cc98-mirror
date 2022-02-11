import { InfReplyList, InfSystemList } from '@/components/NoticeList'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import { getAt, getReply, getSystem } from '@/services/notice'
import { Tab, Tabs, Badge } from '@material-ui/core'
import React, { useState } from 'react'

export default () => {
  const [current, setCurrent] = useState('reply')
  const user = useModel(userModel)
  const { useNotification } = useModel(settingModel, ['useNotification'])

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setCurrent(value)
  }

  return (
    <>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        value={current}
        onChange={handleChange}
      >
        <Tab value="reply" label={<Badge variant='dot' max={99} badgeContent={(useNotification && user.unRead) ? user.unRead.replyCount : 0} color="primary">回复我的</Badge>} />
        <Tab value="at" label={<Badge variant='dot' max={99} badgeContent={(useNotification && user.unRead) ? user.unRead.atCount : 0} color="primary">提到我的</Badge>} />
        <Tab value="system" label={<Badge variant='dot' max={99} badgeContent={(useNotification && user.unRead) ? user.unRead.systemCount : 0} color="primary">系统通知</Badge>} />
      </Tabs>

      {current === 'reply' && <InfReplyList service={getReply} />}
      {current === 'at' && <InfReplyList service={getAt} />}
      {current === 'system' && <InfSystemList service={getSystem} />}
    </>
  )
}