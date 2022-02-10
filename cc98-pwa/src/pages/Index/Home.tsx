import LoadingCircle from '@/components/LoadingCircle'
import useDelay from '@/hooks/useDelay'
import useFetcher from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { getHomeInfo } from '@/services/global'
import { notificationHandler } from '@/services/utils/errorHandler'
import React from 'react'
import Announcement from './Announcement'
import Board from './Board'
import News from './News'
import Recommend from './Recommend'
import Theme from './Theme'

const Home: React.FC = () => {
  const { showStudy, showAcademic, showEmotion, showFullTimeJob, showPartTimeJob, showHot, showSchoolEvent, showMarket } = useModel(settingModel, ['showStudy', 'showAcademic', 'showEmotion', 'showFullTimeJob', 'showPartTimeJob', 'showHot', 'showSchoolEvent', 'showMarket'])
  const { TOGGLE_STUDY, TOGGLE_ACADEMIC, TOGGLE_EMOTION, TOGGLE_FULLTIMEJOB, TOGGLE_PARTTIMEJOB, TOGGLE_HOT, TOGGLE_SCHOOLEVENT, TOGGLE_MARKET } = settingModel
  const [homeInfo] = useFetcher(() => getHomeInfo(), {
    fail: notificationHandler,
  })
  // const isResolve = useDelay(300)

  if (homeInfo === null) {
    return <LoadingCircle />
  }

  return (
    <>
      <Theme />
      <Announcement content={homeInfo.announcement} />
      <Recommend recommendationReading={homeInfo.recommendationReading} />
      <Board name='热门话题' data={homeInfo.hotTopic} status={showHot} func={TOGGLE_HOT} />
      <Board name='校园活动' data={homeInfo.schoolEvent} status={showSchoolEvent} func={TOGGLE_SCHOOLEVENT} />
      <Board name='学术信息' data={homeInfo.academics} status={showAcademic} func={TOGGLE_ACADEMIC} />
      <Board name='学习天地' data={homeInfo.study} status={showStudy} func={TOGGLE_STUDY} />
      <Board name='感性空间' data={homeInfo.emotion} status={showEmotion} func={TOGGLE_EMOTION} />
      <Board name='跳蚤市场' data={homeInfo.fleaMarket} status={showMarket} func={TOGGLE_MARKET} />
      <Board name='求职广场' data={homeInfo.fullTimeJob} status={showFullTimeJob} func={TOGGLE_FULLTIMEJOB} />
      <Board name='实习兼职' data={homeInfo.partTimeJob} status={showPartTimeJob} func={TOGGLE_PARTTIMEJOB} />
      <News schoolNews={homeInfo.schoolNews} />
    </>
  )
}

export default Home
