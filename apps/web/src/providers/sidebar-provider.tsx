'use client'

import { createContext, useEffect, useState } from 'react'

export interface SidebarContextProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Create a context for the sidebar state
export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

// Create a provider component to provide the context to child components
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Set an initial state for the sidebar (check localStorage for existing value)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- default value
      return (JSON.parse(localStorage.getItem('isSidebarOpen')!) as boolean) || false
    }
    return false
  })

  useEffect(() => {
    const storedIsSidebarOpen = localStorage.getItem('isSidebarOpen')
    if (typeof window !== 'undefined' && storedIsSidebarOpen) {
      setIsSidebarOpen(JSON.parse(storedIsSidebarOpen) as boolean)
    }
  }, [])

  // Update localStorage whenever the sidebar state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen))
    }
  }, [isSidebarOpen])

  return (
    // Provide the context to child components
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>{children}</SidebarContext.Provider>
  )
}
