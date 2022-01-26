import Cropper from 'cropperjs'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export { Cropper }

interface Props {
  style: React.CSSProperties
  src: string
}

const ReactCropper: React.ForwardRefRenderFunction<unknown, Props> = (props, ref) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const cropper = useRef<Cropper>()

  useEffect(() => {
    if (!imgRef.current) {
      return
    }
    cropper.current = new Cropper(imgRef.current, {
      viewMode: 2,
      zoomable: true,
      background: false,
    })

    return () => {
      cropper.current && cropper.current.destroy()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getCropper: () => cropper.current,
  }))

  return (
    <div style={props.style}>
      <img ref={imgRef} src={props.src} style={{ opacity: 0 }} />
    </div>
  )
}

export default forwardRef(ReactCropper)
