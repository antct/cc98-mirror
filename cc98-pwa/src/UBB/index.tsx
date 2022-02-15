import settingModel from '@/models/setting'
import { IContext } from '@cc98/context'
import { Typography } from '@mui/material'
import React from 'react'
import ubbReact from './ubbReact'


const context: Partial<IContext> = {
  mode: settingModel.state.mode,
}

settingModel._subscribe((prev, next) => {
  if (prev.mode !== next.mode) {
    context.mode = next.mode
  }
})

interface Props {
  ubbText: string
}

const UBB = React.memo((props: Props) => (
  <Typography component="div">{ubbReact(props.ubbText, context)}</Typography>
))

const UBBReact = (ubbText: string) => ubbReact(ubbText, context)

export { UBB as default, UBBReact }
