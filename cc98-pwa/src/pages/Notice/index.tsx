import { InfReplyList, InfSystemList } from '@/components/NoticeList'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import { getAt, getReply, getSystem } from '@/services/notice'
import { Tab, Tabs, Badge } from '@material-ui/core'
import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

const BadgeS = withStyles(theme => ({
  anchorOriginTopRightRectangle: {
    right: -4
  }
}))(Badge)

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
        <Tab value="reply" label={<BadgeS variant='dot' max={99} badgeContent={(useNotification && user.unRead) ? user.unRead.replyCount : 0} color="primary">回复我的</BadgeS>} />
        <Tab value="at" label={<BadgeS variant='dot' max={99} badgeContent={(useNotification && user.unRead) ? user.unRead.atCount : 0} color="primary">提到我的</BadgeS>} />
        <Tab value="system" label={<BadgeS variant='dot' max={99} badgeContent={(useNotification && user.unRead) ? user.unRead.systemCount : 0} color="primary">系统通知</BadgeS>} />
      </Tabs>

      {current === 'reply' && <InfReplyList service={getReply} />}
      {current === 'at' && <InfReplyList service={getAt} />}
      {current === 'system' && <InfSystemList service={getSystem} />}
    </>
  )
}