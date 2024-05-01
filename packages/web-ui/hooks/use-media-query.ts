'use client'

import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

type UseMediaQueryOptions = {
  defaultValue?: boolean
}

export function useMediaQuery(query: string, { defaultValue = false }: UseMediaQueryOptions = {}): boolean {
  // const IS_SERVER = typeof window === 'undefined'

  const getMatches = (query: string): boolean => {
    // if (IS_SERVER) {
    //   return defaultValue
    // }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    // if (initializeWithValue) {
    //   return getMatches(query)
    // }
    return defaultValue
  })

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [query])

  return matches
}
