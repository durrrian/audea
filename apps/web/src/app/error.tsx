'use client'

import { NextJSError } from '@repo/web-ui/lib'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <NextJSError error={error} reset={reset} />
}
