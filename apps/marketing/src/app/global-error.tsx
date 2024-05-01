'use client'

import { NextJSError } from '@repo/web-ui/lib'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang='id'>
      <body>
        <NextJSError error={error} reset={reset} />
      </body>
    </html>
  )
}
