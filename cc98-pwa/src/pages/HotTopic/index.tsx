import LoadingCircle from '@/components/LoadingCircle'
import { FinTopicList } from '@/components/TopicList'
import useDelay from '@/hooks/useDelay'
import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import ListS from '@/hotfix/List'
import settingModel from '@/models/setting'
import {
  getHistoryHotTopics, getHotTopics, getMonthlyHotTopics, getWeeklyHotTopics
} from '@/services/topic'
import { getUsersBasicInfoByNames } from '@/services/user'
import { notificationHandler } from '@/services/utils/errorHandler'
import { IHotTopic } from '@cc98/api'
import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import HotTopicItem from './HotTopicItem'


interface Props {
  service: typeof getHotTopics
  delay?: number
}

interface IUrlMap {
  [key: string]: string
}

export function useUrlMap() {
  const [urlMap, setUrlMap] = useState<IUrlMap>({})
  const updateUrlMap = async (list: IHotTopic[]) => {
    if (list.length == 0) return null
    let userNames = list.map(p => p.authorName).filter(name => name)
    if (userNames.length == 0) return null
    const res = await getUsersBasicInfoByNames(userNames)
    res.fail().succeed(users => {
      users.forEach(user => {
        urlMap[user.name] = user.portraitUrl
      })
      setUrlMap({ ...urlMap })
    })
  }
  return [urlMap, updateUrlMap] as [typeof urlMap, typeof updateUrlMap]
}


export const HotTopicList: React.FC<Props> = ({ service, delay = 0 }) => {
  const [urlMap, updateUrlMap] = useUrlMap()
  const [topics] = useFetcher(service, {
    fail: notificationHandler,
    success: updateUrlMap
  })
  const isResolve = useDelay(delay)

  if (topics === null || !isResolve) {
    return <LoadingCircle />
  }

  return (
    <ListS>
      {topics.map(data => (
        <HotTopicItem key={data.id} data={data} portraitUrl={urlMap[data.authorName]} />
      ))}
    </ListS>
  )
}

export default () => {
  const [current, setCurrent] = useState('day')

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setCurrent(value)
  }

  return (
    <>
      <Tabs
        value={current}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab value="day" label="今日热门" />
        <Tab value="week" label="本周热门" />
        <Tab value="month" label="本月热门" />
        <Tab value="history" label="历史今日" />
      </Tabs>

      {current === 'day' && <HotTopicList service={getHotTopics} delay={300} />}
      {current === 'week' && <FinTopicList service={getWeeklyHotTopics} place="hot" delay={300} />}
      {current === 'month' && (
        <FinTopicList service={getMonthlyHotTopics} place="hot" delay={300} />
      )}
      {current === 'history' && (
        <FinTopicList service={getHistoryHotTopics} place="hot" delay={300} />
      )}
    </>
  )
}
