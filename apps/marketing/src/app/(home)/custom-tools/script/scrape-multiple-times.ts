import { fetchData } from './fetch-data'
import { scrapeData } from './scrape-data'
import { removeDuplicates } from './remove-duplicates'

const BASE_URL = 'https://samsat-pkb.jakarta.go.id/INFO_NJKB'

export interface GetVehiclePriceOutput {
  tipeKendaraan: string
  nilaiJual: string
}

export async function scrapeMultipleTimes(JEN: string, THN: string, MER: string): Promise<GetVehiclePriceOutput[]> {
  try {
    const result = []

    let valForNextLoadHere: undefined | string

    for (let i = 0; i < 10; i++) {
      const encodedParams = new URLSearchParams()

      if (i === 0) {
        encodedParams.set('JEN', JEN.toString())
        encodedParams.set('THN', THN)
        encodedParams.set('MER', MER)
        encodedParams.set('TOMBOL', 'Proses')
        encodedParams.set('FLAG', '2')
      } else {
        encodedParams.set('PUPD', `${valForNextLoadHere}`)
        encodedParams.set('TOMBOL', 'NEXT')
        encodedParams.set('FLAG', '3')
      }

      const htmlText = await fetchData(BASE_URL, encodedParams)
      const { valForNextLoad, data } = scrapeData(htmlText)

      valForNextLoadHere = valForNextLoad

      result.push(...data)
    }

    const uniqueResult = removeDuplicates(result, 'tipeKendaraan')

    return uniqueResult
  } catch (error) {
    console.error(error)
    throw error
  }
}
