import { Theme } from '@mui/material/styles'
import { styled } from '@mui/styles'
import { CreateCSSProperties, WithStylesOptions } from '@mui/styles/withStyles'
import React from 'react'

export default function muiStyled<Props>(Component: React.ComponentType<Props> | React.ReactType) {
  function styledCreator(
    styles: CreateCSSProperties<{ theme: Theme; }> | ((props: { theme: Theme; } & { theme: Theme; }) => CreateCSSProperties<{ theme: Theme; }>),
    options?: WithStylesOptions<{ theme: Theme }>
  ) {
    // 强制保留原组件类型，对类型提示有帮助
    return styled(Component)(styles, options as any) as React.ComponentType<Props>
  }

  // 参考 styled-components 的 api
  styledCreator.attrs = (attrs: Props) =>
    muiStyled((props: Props) => <Component {...attrs} {...props} />)

  return styledCreator
}
