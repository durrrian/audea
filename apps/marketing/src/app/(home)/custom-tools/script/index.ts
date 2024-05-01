'use server'

import { scrapeMultipleTimes } from './scrape-multiple-times'

interface Data {
  /**
   * Minibus: 32
   * Sedan: 10
   * Jeep: 20
   * Sepeda motor: 70
   */
  JEN: '32' | '10' | '20' | '70'
  THN: string
  MER: string
}

export async function script(data: Data) {
  try {
    const finalType = await scrapeMultipleTimes(data.JEN, data.THN, data.MER)
    return finalType
  } catch (error) {
    console.error(error)
    throw error
  }
}
