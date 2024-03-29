import imgOnTouch from '@/assets/error-on-touch.png'
import img from '@/assets/error.png'
import { MAX_WIDTH } from '@/config'
import React, { useState } from 'react'
import styled from 'styled-components'


const Img = styled.img`
  width: 60%;
  max-width: ${MAX_WIDTH}px;
`
/**
 * props for ErrorImage component
 */
interface Props {
  /**
   * status code
   */
  status: string
}

/**
 * image for error page
 */
const ErrorImage: React.FC<Props> = props => {
  const [imgSrc, setImgSrc] = useState(img)

  const changeImage = () => {
    imgSrc === img ? setImgSrc(imgOnTouch) : setImgSrc(img)
  }

  return <Img src={imgSrc} alt={props.status} onTouchStart={changeImage} onTouchEnd={changeImage} />
}

export default ErrorImage
