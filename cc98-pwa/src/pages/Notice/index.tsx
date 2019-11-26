import React, { useState } from 'react'

import { InfSystemList, InfReplyList } from '@/components/NoticeList'

import { Tab, Tabs } from '@material-ui/core'

import { getSystem, getReply, getAt } from '@/services/notice'

export default () => {
  const [current, setCurrent] = useState('system')

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
        <Tab value="system" label="系统通知" />
        <Tab value="reply" label="回复我的" />
        <Tab value="at" label="提到我的" />
      </Tabs>

      {current === 'system' && <InfSystemList service={getSystem} />}
      {current === 'reply' && <InfReplyList service={getReply} />}
      {current === 'at' && <InfReplyList service={getAt} />}
    </>
  )
}