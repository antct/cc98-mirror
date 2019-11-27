import React from 'react'
import useDelay from '@/hooks/useDelay'
import LoadingCircle from '@/components/LoadingCircle'

import useFetcher from '@/hooks/useFetcher'

import Announcement from './Announcement'
import Board from './Board'
import Recommend from './Recommend'

import { getHomeInfo } from '@/services/global'
import { notificationHandler } from '@/services/utils/errorHandler'

const Home: React.FC = () => {
  const [homeInfo] = useFetcher(getHomeInfo, {
    fail: notificationHandler,
  })
  const isResolve = useDelay(300)

  if (homeInfo === null || !isResolve) {
    return <LoadingCircle />
  }

  return (
    <>
      <Announcement content={homeInfo.announcement} />
      <Recommend recommendationReading={homeInfo.recommendationReading} />
      <Board name='今日十大' data={homeInfo.hotTopic} />
      <Board name='学习天地' data={homeInfo.study} />
      <Board name='感性空间' data={homeInfo.emotion} />
      <Board name='实习兼职' data={homeInfo.partTimeJob} />
      <Board name='求职广场' data={homeInfo.fullTimeJob} />
      <Board name='跳蚤市场' data={homeInfo.fleaMarket} />
      <Board name='学术信息' data={homeInfo.academics} />
      <Board name='校园活动' data={homeInfo.schoolEvent} />
    </>
  )
}

export default Home