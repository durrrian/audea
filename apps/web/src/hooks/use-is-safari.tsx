'use client'

import { useEffect, useState } from 'react'

export function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const safari = /^(?<temp1>(?!chrome|android).)*safari/i.test(navigator.userAgent)
    setIsSafari(safari)
  }, [])

  return isSafari
}
