declare module '@cc98/api' {

  interface Face {
    age: number
    beauty: number
    expression: number
    gender: number
    hair: string
    hat: boolean
    eyeOpen: boolean
    mask: boolean
    x: number
    y: number
    dx: number
    dy: number
  }

  export interface IFace {
    /**
     * 人脸
     */
    faces: Face[]
    /**
     * 信息
     */
    msg: string
  }
}
