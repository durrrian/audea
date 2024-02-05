'use client'

import { ViewportContext, ViewportContextType } from '@/provider/viewport-provider'
import { useContext } from 'react'

export default function useViewport(): ViewportContextType {
  const context = useContext(ViewportContext)
  if (context === undefined) {
    throw new Error('useViewport must be used within a ViewportProvider')
  }
  return context
}
