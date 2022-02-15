import { IMG_BASE_URL } from '@/config'
import { Theme } from '@/muiStyled'
import { navigate } from '@/utils/history'
import { IBasicBoard } from '@cc98/api'
import { CardMedia, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import LazyLoad from 'react-lazyload'

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
  const transName = (name: string) => {
    const idx = name.indexOf('·')
    if (idx === -1) return name
    else return name.substring(0, idx)
  }

  return (
    <LazyLoad height={100} offset={200}>
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
            <CardMedia className={classes.media} image={`${IMG_BASE_URL}/_${transName(boardInfo.name)}.png`} />
          </div>
        )}
      </div>
    </LazyLoad>
  )
}
