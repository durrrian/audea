'use client'

import { ReactElement, ReactNode, createContext, useEffect, useState } from 'react'

export interface ViewportContextType {
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  xxl: boolean
  viewport: number
}

export const ViewportContext = createContext<ViewportContextType | undefined>(undefined)

interface IViewportProvider {
  children: React.ReactNode
}

export function ViewportProvider({ children }: { children: ReactNode }): ReactElement<IViewportProvider> {
  const [xs, setXs] = useState(false)
  const [sm, setSm] = useState(false)
  const [md, setMd] = useState(false)
  const [lg, setLg] = useState(false)
  const [xl, setXl] = useState(false)
  const [xxl, setXxl] = useState(false)
  const [viewport, setViewport] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const width = window.screen.width

      setXs(width < 640)
      setSm(width >= 640 && width < 768)
      setMd(width >= 768 && width < 1024)
      setLg(width >= 1024 && width < 1280)
      setXl(width >= 1280 && width < 1536)
      setXl(width >= 1280 && width < 1536)
      setXxl(width >= 1536)

      const innerWidth = window.innerWidth

      setXs(innerWidth < 640)
      setSm(innerWidth >= 640 && innerWidth < 768)
      setMd(innerWidth >= 768 && innerWidth < 1024)
      setLg(innerWidth >= 1024 && innerWidth < 1280)
      setXl(innerWidth >= 1280 && innerWidth < 1536)
      setXl(innerWidth >= 1280 && innerWidth < 1536)
      setXxl(innerWidth >= 1536)

      setViewport(innerWidth)
    }

    // Initial check on component mount
    handleResize()

    // Event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <ViewportContext.Provider value={{ xs, sm, md, lg, xl, xxl, viewport }}>{children}</ViewportContext.Provider>
}
