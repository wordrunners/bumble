import React, { ForwardedRef } from 'react'

export const InDOMAudioComponent = React.forwardRef((props: { src: string, type: string },
                                                     ref: ForwardedRef<HTMLAudioElement>) => {
  const { src } = props
  return (
    <>
      <audio ref={ ref } >
        <source src={src} type={props.type ? props.type : "audio/mp3"} />
      </audio>
    </>
  )
})
