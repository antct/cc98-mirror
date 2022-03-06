import FixFab from '@/components/FixFab'
import { InfReplyList, InfSystemList } from '@/components/NoticeList'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import userModel from '@/models/user'
import { getAt, getReply, getSystem } from '@/services/notice'
import { Badge, Tab, Tabs, Tooltip } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import React, { useState } from 'react'
import ReadIcon from '@mui/icons-material/MarkEmailRead'
import { readAllAt, readAllSystem, readAllReply } from '@/services/message'

const BadgeS = withStyles(theme => ({
  anchorOriginTopRight: {
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
      <FixFab
        onClick={
          () => {
            const service = (current === 'reply') ? readAllReply : (current === 'at' ? readAllAt : readAllSystem)
            service()
          }
        }
      >
        <Tooltip title='已读' placement='left'>
          <ReadIcon />
        </Tooltip>
      </FixFab>
    </>
  )
}