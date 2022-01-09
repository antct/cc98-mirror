import pink from '@material-ui/core/colors/pink'
import { createTheme } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createTheme'

// https://material.io/tools/color/#!/?view.left=0&view.right=0

export enum ThemeEnum {
  DEFAULT,
  SPRING,
  SUMMER,
  FALL,
  WINTER,
}

export enum ModeEnum {
  LIGHT,
  DARK,
}

// default
const defaultLight: ThemeOptions = {
  palette: {
    primary: {
      main: '#7A92C2',
      contrastText: '#fff',
    },
    secondary: pink,
  },
}

const defaultDark: ThemeOptions = {
  palette: {
    primary: {
      main: '#7A92C2',
      contrastText: '#fff',
    },
    secondary: pink,
    type: 'dark',
  },
}

// spring
const springLight: ThemeOptions = {
  palette: {
    primary: {
      main: '#95B675',
    },
    secondary: pink,
  },
}

const springDark: ThemeOptions = {
  palette: {
    primary: {
      main: '#95B675',
    },
    secondary: pink,
    type: 'dark',
  },
}

const summerLight: ThemeOptions = {
  palette: {
    primary: {
      main: '#5198D8',
    },
    secondary: pink,
  },
}

const summerDark: ThemeOptions = {
  palette: {
    primary: {
      main: '#5198D8',
    },
    secondary: pink,
    type: 'dark',
  },
}

const autumnLight: ThemeOptions = {
  palette: {
    primary: {
      main: '#F4A460',
    },
    secondary: pink,
  },
}

const autumnDark: ThemeOptions = {
  palette: {
    primary: {
      main: '#F4A460',
    },
    secondary: pink,
    type: 'dark',
  },
}

const winnerLight: ThemeOptions = {
  palette: {
    primary: {
      main: '#7A92C2',
    },
    secondary: pink,
  },
}

const winnerDark: ThemeOptions = {
  palette: {
    primary: {
      main: '#7A92C2',
    },
    secondary: pink,
    type: 'dark',
  },
}

const themeMap: {
  [key: string]: {
    [key: string]: ThemeOptions
  }
} = {
  [ModeEnum.LIGHT]: {
    [ThemeEnum.DEFAULT]: defaultLight,
    [ThemeEnum.SPRING]: springLight,
    [ThemeEnum.SUMMER]: summerLight,
    [ThemeEnum.FALL]: autumnLight,
    [ThemeEnum.WINTER]: winnerLight
  },
  [ModeEnum.DARK]: {
    [ThemeEnum.DEFAULT]: defaultDark,
    [ThemeEnum.SPRING]: springDark,
    [ThemeEnum.SUMMER]: summerDark,
    [ThemeEnum.FALL]: autumnDark,
    [ThemeEnum.WINTER]: winnerDark
  },
}

/**
 * 获取主题
 */
function _getTheme(theme: ThemeEnum, mode: ModeEnum): ThemeOptions {
  const safeMode = ModeEnum[mode] ? mode : ModeEnum.LIGHT
  const safeTheme = ThemeEnum[theme] ? theme : ThemeEnum.DEFAULT

  return themeMap[safeMode][safeTheme]
}

/**
 * 根据设置的主题和模式获取 MUI Theme
 */
export function getTheme(themeColor: ThemeEnum, mode: ModeEnum) {
  const theme = {
    ..._getTheme(themeColor, mode),
  }

  return createTheme(theme)
}
