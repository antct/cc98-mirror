import { BOARD_COMPRESS_WIDTH, CDN, IMG_BASE_URL } from '@/config'
import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'
import { Theme } from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IBasicBoard } from '@cc98/api'
import { CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    margin: 8,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '7px 12px 7px 16px',
    minHeight: 70,
  },
  name: {
    marginBottom: 4,
  },
  desc: {
    lineHeight: 1.25,
  },
  media: {
    width: 75,
    height: 75,
    margin: 4,
    padding: 4,
    flexShrink: 0,
  },
  mediaGround: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
  },
}))

interface Props {
  boardInfo: IBasicBoard
  hasCover?: boolean
}

export default ({ boardInfo, hasCover }: Props) => {
  const classes = useStyles()
  const { useCDN } = useModel(settingModel, ['useCDN'])
  const transName = (name: string) => {
    const idx = name.indexOf('·')
    if (idx === -1) return name
    else return name.substring(0, idx)
  }

  return (
    <div className={classes.card} onClick={() => navigate(`board/${boardInfo.id}`)}>
      <div className={classes.content}>
        <Typography variant="subtitle1" color="primary" className={classes.name}>
          {boardInfo.name}
        </Typography>
        <Typography color="textSecondary" className={classes.desc}>
          {boardInfo.description}
        </Typography>
      </div>

      {hasCover && (
        <div className={classes.mediaGround}>
          <CardMedia className={classes.media} image={!useCDN ? `${IMG_BASE_URL}/_${transName(boardInfo.name)}.png?width=${BOARD_COMPRESS_WIDTH}` : CDN(`${IMG_BASE_URL}/_${transName(boardInfo.name)}.png`, false)} />
        </div>
      )}
    </div>
  )
}
