import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import muiStyled from '@/muiStyled'
import { getPostSummary, getSharePostSummary, getSinglePost } from '@/services/post'
import UBB from '@/UBB'
import { POST } from '@/utils/fetch'
import snackbar from '@/utils/snackbar'
import { IPost, ITopic, IUser } from '@cc98/api'
import { Card, CardContent, CardHeader, Checkbox, Chip, Divider, IconButton, Paper, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles';
import DoneIcon from '@mui/icons-material/Done'
import SummaryIcon from '@mui/icons-material/FormatQuote'
import TagIcon from '@mui/icons-material/Tag'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import MarkdownView from 'react-showdown'
import styled from 'styled-components'
import { IVote } from '../PostList'
import Actions from './Actions'
import Awards from './Awards'
import Content from './Content'
import Header from './Header'


const Wrapper = muiStyled(Paper).attrs({
  square: true,
  elevation: 0,
})({})

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

const ChipS = muiStyled(Chip)({
  marginRight: 8,
  height: 16
})

const SummaryS = withStyles(theme => ({
  root: {
    height: 'auto',
    marginTop: 8,
    maxWidth: '100%',
    alignItems: "normal",
    borderRadius: 0
  },
  label: {
    whiteSpace: "normal",
  }
}))(Chip)

const TagIconS = muiStyled(TagIcon)({
  height: 16,
  width: 16
})

const SummaryIconS = muiStyled(SummaryIcon)({
  height: 16,
  width: 16
})

const ChipDiv = styled.div`
  margin: -8px 16px 8px 16px;
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
  isShare: boolean
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
   * 分享状态下的ID信息
   */
  realId?: string
}

const DELETE_CONTENT = '该贴已被 my CC98, my home'

export default ({ postInfo, userInfo, isHot, isTrace = false, isShare, topicInfo = undefined, voteInfo = undefined, setVote = undefined, realId = undefined }: Props) => {
  const [currentPost, setCurrentPost] = useState<IPost>(postInfo)
  const [currentVote, setCurrentVote] = useState<IVote | undefined>(voteInfo)
  const [voteOption, setVoteOption] = useState<boolean[]>([])
  const [currentSummary, setCurrentSummary] = useState<string | undefined>(undefined)

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
    const res = await ((isShare && realId !== undefined) ? getSharePostSummary(realId) : getPostSummary(postInfo.topicId))
    res.fail().succeed(summary => {
      setCurrentSummary(summary)
    })
  }

  useEffect(() => {
    if (postInfo && postInfo.floor === 1) {
      getSummary()
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
    <Wrapper>
      {
        topicInfo && postInfo.floor === 1 ?
          <Header postInfo={currentPost} userInfo={userInfo} isHot={isHot} isShare={isShare} isLock={topicInfo.state === 1} />
          :
          <Header postInfo={currentPost} userInfo={userInfo} isHot={isHot} isShare={isShare} />
      }
      {
        postInfo.floor === 1 && !!postInfo.tags &&
        <ChipDiv>
          {
            postInfo.tags.map((value, index) => (
              <ChipS icon={<TagIconS />} size="small" label={value} />
            ))
          }
        </ChipDiv>
      }
      {
        postInfo.floor === 1 &&
        <ChipDiv>
          {currentSummary !== undefined ?
            <SummaryS icon={<SummaryIconS />} size="small" label={currentSummary} />
            :
            <SummaryS icon={<SummaryIconS />} size="small" label={'帖子摘要生成中...'} />
          }
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
      <Content postInfo={currentPost} />
      {
        <Actions
          postInfo={currentPost}
          userInfo={userInfo}
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
    </Wrapper>
  );
}
