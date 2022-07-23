import { Service } from '@/hooks/useFetcher'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getSinglePost } from '@/services/post'
import { searchTopicContent } from '@/services/topic'
import UBB from '@/UBB'
import { POST } from '@/utils/fetch'
import { navigate } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { IPost, ISummary, ITopic, IUser } from '@cc98/api'
import DoneIcon from '@mui/icons-material/Done'
import SummaryIcon from '@mui/icons-material/FormatQuote'
import AwesomeIcon from '@mui/icons-material/AutoAwesome'
import TagIcon from '@mui/icons-material/Tag'
import { Card, CardContent, CardHeader, Checkbox, Chip, Divider, IconButton, Paper, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import MarkdownView from 'react-showdown'
import styled from 'styled-components'
import { IVote } from '../PostList'
import Actions from './Actions'
import Awards from './Awards'
import Content from './Content'
import Header from './Header'

const WrapperDiv = styled.div`
  margin: 8px 16px;
`

const TypographyS = muiStyled(Typography).attrs({
})({
  margin: '12px 16px',
  marginBottom: 4
})

const RightTypography = muiStyled(Typography).attrs({
})({
  display: "inline-block",
  float: "right"
})

const CardS = muiStyled(Card).attrs({
})({
  margin: '12px 16px',
  marginBottom: 4,
  borderRadius: 0,
})

const CardHeaderS = withStyles(theme => ({
  root: {
    paddingTop: 8,
    paddingBottom: 0
  },
  action: {
    marginRight: -12
  }
}))(CardHeader)

const CardContentS = muiStyled(CardContent).attrs({
})({
  paddingTop: 8,
  '&:last-child': {
    paddingBottom: 8
  }
})

const CheckboxS = muiStyled(Checkbox).attrs({
})({
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  verticalAlign: 'text-top'
})

const ChipS = withStyles(theme => ({
  root: {
    height: 16,
    marginRight: 8
  }
}))(Chip)

const SummaryS = withStyles(theme => ({
  root: {
    height: 'auto',
    maxWidth: '100%',
    alignItems: "normal",
    borderRadius: 0
  },
  label: {
    whiteSpace: "normal",
  }
}))(Chip)

const ClickSummaryS = withStyles(theme => ({
  root: {
    height: 'auto',
    alignItems: "normal",
    borderRadius: 0
  },
  label: {
    whiteSpace: "normal",
    textDecoration: "underline"
  }
}))(Chip)

const TagIconS = muiStyled(TagIcon)({
  width: 16
})

const SummaryIconS = muiStyled(SummaryIcon)({
  width: 16
})

const AwesomeIconS = muiStyled(AwesomeIcon)({
  width: 16
})


const ChipDiv = styled.div`
  margin: 0px 16px 8px 16px;
  display: flex;
`

const ChippDiv = styled.div`
  margin: 8px 16px 0px 16px;
  display: flex;
`

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
  /**
   * 用户信息
   */
  userInfo?: IUser
  /**
   * 是否热帖
   */
  isHot?: boolean
  /**
   * 是否追踪
   */
  isTrace?: boolean
  /**
   * 是否分享
   */
  isShare?: boolean
  /**
   * 帖子元信息
   */
  topicInfo?: ITopic
  /**
   * 获取投票信息函数
   */
  setVote?: () => Promise<void>
  /**
   * 投票信息
   */
  voteInfo?: IVote
  /**
   * 摘要服务
   */
  summaryService?: Service<ISummary>
}

const DELETE_CONTENT = '该贴已被 my CC98, my home'

const PostItem = React.forwardRef<HTMLDivElement, Props>(({ postInfo, userInfo, isHot, isTrace = false, isShare = false, topicInfo = undefined, voteInfo = undefined, setVote = undefined, summaryService = undefined }: Props, ref) => {
  const [currentPost, setCurrentPost] = useState<IPost>(postInfo)
  const [currentVote, setCurrentVote] = useState<IVote | undefined>(voteInfo)
  const [voteOption, setVoteOption] = useState<boolean[]>([])
  const [currentSummary, setCurrentSummary] = useState<string | undefined>(undefined)
  const [recommendationPost, setRecommendationPost] = useState<IPost[] | undefined>(undefined)

  const { useSignature } = useModel(settingModel, ['useSignature'])
  if (postInfo.isDeleted) {
    postInfo.content = DELETE_CONTENT
  }

  const refreshPost = async () => {
    const res = await getSinglePost(postInfo.topicId, postInfo.floor)
    res.fail().succeed(post => {
      if (post.isDeleted) {
        post.content = DELETE_CONTENT
        if (userInfo) {
          userInfo.portraitUrl = ''
        }
      }
      setCurrentPost(post)
    })
  }

  const getSummary = async () => {
    if (summaryService === undefined) return
    const res = await summaryService()
    res.fail().succeed(data => {
      setCurrentSummary(data.summary)
    })
  }

  const getRecommendation = async () => {
    const res = await searchTopicContent(postInfo.title, 0, 0)
    res.fail().succeed(data => {
      setRecommendationPost(data)
    })
  }


  useEffect(() => {
    if (postInfo && postInfo.floor === 1) {
      getSummary()
      getRecommendation()
    }
  }, [postInfo])


  useEffect(() => {
    if (voteInfo) {
      setCurrentVote(voteInfo)
      setVoteOption(new Array(voteInfo.voteItems.length).fill(false))
    }
  }, [voteInfo])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, index: number) => {
    setVoteOption(prevOption => {
      prevOption[index] = checked
      return prevOption
    })
  }

  const submitVote = (topicId: number, items: number[]) => {
    return POST<IVote>(`topic/${topicId}/vote`, {
      params: {
        items
      }
    })
  }

  const handleSubmit = async () => {
    const submitOption = []
    for (var i = 0; i < voteOption.length; i++) {
      if (voteOption[i]) submitOption.push(i + 1)
    }
    if (topicInfo && setVote && voteInfo) {
      if (submitOption.length > voteInfo.maxVoteCount) {
        snackbar.error(`投票最多选择${voteInfo.maxVoteCount}项`)
        return
      }
      const res = await submitVote(topicInfo.id, submitOption)
      res.fail().succeed(() => {
        setVote().then(() => {
          snackbar.success('投票成功')
        })
      })
    }
  }

  return (
    <Paper ref={ref} square={true} elevation={0}>
      {
        topicInfo && postInfo.floor === 1 ?
          <Header postInfo={currentPost} userInfo={userInfo} isHot={isHot} isShare={isShare} isLock={topicInfo.state === 1} />
          :
          <Header postInfo={currentPost} userInfo={userInfo} isHot={isHot} isShare={isShare} />
      }
      {
        postInfo.floor === 1 && !!postInfo.tags && postInfo.tags.length > 0 &&
        <ChipDiv>
          {
            postInfo.tags.map((value, index) => (
              <ChipS icon={<TagIconS />} size="small" label={value} />
            ))
          }
        </ChipDiv>
      }
      {
        postInfo.floor === 1 && currentSummary !== undefined && currentSummary.length > 0 &&
        <ChipDiv>
          <SummaryS icon={<SummaryIconS />} size="small" label={currentSummary} />
        </ChipDiv>
      }
      {
        topicInfo && postInfo.floor === 1 && topicInfo.todayCount > 3 &&
        (() => {
          let content = '```text\n'
          content += `该用户今日在本版发布了${topicInfo.todayCount}个主题帖\n`
          content += '```'
          return <TypographyS><MarkdownView markdown={content}></MarkdownView></TypographyS>
        })()
      }
      {
        topicInfo && topicInfo.isVote &&
        (currentVote &&
          <CardS variant="outlined">
            <CardHeaderS
              action={
                currentVote.needVote && currentVote.canVote &&
                <IconButton onClick={handleSubmit} size="large">
                  <DoneIcon />
                </IconButton>
              }
              title={
                <>
                  {!!currentVote.myRecord && <Typography variant="body1">{`投票详情：你的选项是 ${currentVote.myRecord.items.join('，')}`}</Typography>}
                  {!!!currentVote.myRecord && <Typography variant="body1">{`投票详情：你尚未投票`}</Typography>}
                </>
              }
              subheader={<Typography variant="body2">{`截止时间：${dayjs(currentVote.expiredTime).format('YYYY/MM/DD HH:mm')}`}</Typography>}
            />
            <CardContentS>
              {!!currentVote.myRecord ?
                currentVote.voteItems.map((item, index) => (
                  <Typography>
                    <CheckboxS
                      size='small'
                      disabled={!(currentVote.needVote && currentVote.canVote)}
                      checked={!!currentVote.myRecord && currentVote.myRecord.items.indexOf(index + 1) !== -1}
                    />
                    {`${index + 1}. ${item.description}`}
                    <RightTypography>
                      {`${item.count}人/${(100 * item.count / (currentVote.voteUserCount || 1)).toFixed(2)}%`}
                    </RightTypography>
                  </Typography>
                ))
                :
                currentVote.voteItems.map((item, index) => (
                  <Typography>
                    <CheckboxS
                      size='small'
                      onChange={(event, checked) => handleChange(event, checked, index)}
                      disabled={!(currentVote.needVote && currentVote.canVote)}
                    />
                    {`${index + 1}. ${item.description}`}
                    <RightTypography>
                      {`${item.count}人/${(100 * item.count / (currentVote.voteUserCount || 1)).toFixed(2)}%`}
                    </RightTypography>
                  </Typography>
                ))
              }
            </CardContentS>
          </CardS>
        )
      }
      <Content
        postInfo={currentPost}
        isShare={isShare}
      />
      {
        postInfo.floor === 1 && !!recommendationPost && recommendationPost.length >= 2 &&
        <ChippDiv>
          <SummaryS icon={<AwesomeIconS />} size="small" label={"你可能感兴趣的内容"} />
          {
            recommendationPost.slice(1, 4).map((data, index) => (
              <ClickSummaryS size="small" label={data.title} onClick={() => navigate(`/topic/${data.topicId}`)} />
            ))
          }
        </ChippDiv>
      }
      {
        <Actions
          postInfo={currentPost}
          userInfo={userInfo}
          isShare={isShare}
          isTrace={isTrace}
          refreshPost={refreshPost}
        />
      }
      {useSignature && userInfo !== undefined && userInfo.signatureCode &&
        (
          <>
            <Divider />
            <WrapperDiv>
              <UBB ubbText={userInfo.signatureCode.trim()} />
            </WrapperDiv>
          </>
        )
      }
      <Awards
        key={currentPost.awards ? currentPost.awards.length : 0}
        awards={currentPost.awards}
      />
      <Divider />
    </Paper>
  )
})

export default PostItem