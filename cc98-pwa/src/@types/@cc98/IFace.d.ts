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
  }

  export interface IFace {
    /**
     * 人脸
     */
    faces: Face[]
    /**
     * 信息
     */
    msg?: string
    /**
     * 人脸带框的URL
     */
    url: string
  }
}
