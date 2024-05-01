/* eslint-disable func-names -- its okay */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors -- reject is okay */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- its okay */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- according to api is okay */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error -- need ts-ignore for some things */
/* eslint-disable @typescript-eslint/ban-ts-comment -- need ts-ignore for some things */
/* eslint-disable @typescript-eslint/no-unsafe-call -- no need for eslint here since it's custom api */

'use client'

import { useUser } from '@clerk/nextjs'
import type { ReactNode } from 'react'
import { createContext, useEffect, useState } from 'react'

const TIDIO_CODE = '//code.tidio.co/wv2wkzplrqbjgg9zxqvdj7u40n2er6o8.js'

export interface TidioContextProps {
  isTidioExist: boolean
  active: boolean
  loadTidio: () => Promise<unknown>
  openTidio: () => void
}

export const TidioContext = createContext<TidioContextProps | undefined>(undefined)

export function TidioProvider({ children }: { children: ReactNode }) {
  const [isTidioExist, setIsTidioExist] = useState(false)
  const [active, setActive] = useState(false)

  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (user) {
      // @ts-ignore
      document.tidioIdentify = {
        distinct_id: user.id, // Unique visitor ID in your system
        email: user.primaryEmailAddress?.emailAddress, // visitor email
        name: `${user.firstName} ${user.lastName}`, // Visitor name
        phone: user.phoneNumbers[0] ?? '', //Visitor phone
      }
    }

    const existingScript = document.querySelector(`script[src*="${TIDIO_CODE}"]`)

    if (existingScript) setIsTidioExist(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need
  }, [isLoaded])

  const loadTidio = async () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = TIDIO_CODE
      script.setAttribute('type', 'text/javascript')

      script.onload = (e) => {
        setIsTidioExist(true)

        // @ts-ignore
        if (window.tidioChatApi) {
          // @ts-ignore
          window.tidioChatApi.on('ready', onTidioChatApiReady())
        } else {
          // @ts-ignore
          document.addEventListener('tidioChat-ready', onTidioChatApiReady())
        }

        resolve(e)
      }

      script.onerror = (e) => {
        reject(e)
      }

      document.body.appendChild(script)
    })
  }

  const openTidio = () => {
    // @ts-ignore
    window.tidioChatApi.show()

    // @ts-ignore
    window.tidioChatApi.open()
    setActive(true)
  }

  const onTidioChatApiReady = () => {
    const onClose = () => {
      setActive(false)

      // Get the <html> and <body> elements
      const htmlElement = document.documentElement
      const bodyElement = document.body

      // Remove all inline styles from <html>
      for (const property in htmlElement.style) {
        if (Object.prototype.hasOwnProperty.call(htmlElement.style, property)) {
          htmlElement.style.removeProperty(property)
        }
      }

      // Remove all inline styles from <body>
      for (const property in bodyElement.style) {
        if (Object.prototype.hasOwnProperty.call(bodyElement.style, property)) {
          bodyElement.style.removeProperty(property)
        }
      }
    }

    // @ts-ignore
    window.tidioChatApi.on('close', function () {
      // @ts-ignore
      window.tidioChatApi.hide()
      onClose()
    })

    // @ts-ignore
    window.tidioChatApi.on('open', function () {
      openTidio()
    })

    openTidio()
  }

  return (
    <TidioContext.Provider value={{ loadTidio, isTidioExist, active, openTidio }}>{children}</TidioContext.Provider>
  )
}
