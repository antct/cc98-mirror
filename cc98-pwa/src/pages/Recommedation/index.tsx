import React from 'react'
import useDelay from '@/hooks/useDelay'
import LoadingCircle from '@/components/LoadingCircle'

import useFetcher from '@/hooks/useFetcher'

import Announcement from './Announcement'
import RecommendReadings from './Recommend'
import Board from './Board'

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
      <RecommendReadings recommendationReading={homeInfo.recommendationReading} />
      <Announcement content={homeInfo.announcement} />
      <Board name='学习天地' data={homeInfo.study} board={true} />
      <Board name='感性空间' data={homeInfo.emotion} board={true} />
      <Board name='实习兼职' data={homeInfo.partTimeJob} board={true} />
      <Board name='求职广场' data={homeInfo.fullTimeJob} board={true} />
      <Board name='跳蚤市场' data={homeInfo.fleaMarket} board={true} />
      <Board name='学术信息' data={homeInfo.academics} board={true} />
      <Board name='校园活动' data={homeInfo.schoolEvent} board={true} />
      <Board name='校园新闻' data={homeInfo.schoolNews} board={false} />
    </>
  )
}

export default Home
