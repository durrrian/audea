'use client'

import { useLayoutEffect } from 'react'

export const AudioPolyfill = () => {
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      import('audio-recorder-polyfill').then((AudioRecorderPolyfill) => {
        window.MediaRecorder = AudioRecorderPolyfill.default || AudioRecorderPolyfill
      })
    }
  }, [])

  return <></>
}
