'use client'

import { useEffect } from 'react'

export function InjectManifest() {
  useEffect(() => {
    const isAppleDevice = /Mac|iPhone|iPad|iPod|Macintosh|Apple/i.test(navigator.userAgent)
    const hasTouchPoint = navigator.maxTouchPoints > 0

    const manifestLink = document.createElement('link')
    manifestLink.rel = 'manifest'

    if (isAppleDevice) {
      if (hasTouchPoint) {
        manifestLink.href = '/manifest-ios.json'
      } else {
        manifestLink.href = '/manifest-apple.json'
      }
    } else {
      manifestLink.href = '/manifest.json'
    }

    document.head.appendChild(manifestLink)
  }, [])

  return null
}
