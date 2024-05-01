'use client'

import { useContext } from 'react'
import { TidioContext } from '~/providers/tidio-provider'

export function useTidio() {
  const context = useContext(TidioContext)

  if (context === undefined) {
    throw new Error('useTidio must be used within a TidioProvider')
  }

  return context
}
