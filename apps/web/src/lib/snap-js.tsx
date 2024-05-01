import { parseUrlMidtransApp } from '@repo/helper'
import Script from 'next/script'

export function SnapJS() {
  const snapSrcUrl = parseUrlMidtransApp('/snap/snap.js').href

  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- irrelevant
    <Script
      src={snapSrcUrl}
      data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      strategy='beforeInteractive'
    />
  )
}
