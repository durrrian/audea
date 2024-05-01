import { parseUrl } from '@repo/helper'

export const customFetch = async (endPoint: `/api/${string}`, init: RequestInit) => {
  try {
    const response = await fetch(parseUrl('web', endPoint), init)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data as unknown
  } catch (error) {
    console.error(error)
    throw error
  }
}
