'use server'

import { prisma } from '@repo/prisma'
import oldAxios from 'axios'

type WithEmintenCode = {
  type: 'code'
  emitenCode: string
}

type WithEmitenId = {
  type: 'id'
  emitenId: string
}

export type GetStockPriceProps = WithEmintenCode | WithEmitenId

export async function getStockPrice(props: GetStockPriceProps) {
  try {
    let kodeEmiten: string

    if (props.type === 'code') {
      const { emitenCode } = props

      if (emitenCode.length !== 4) throw new Error('Emiten code must be 4 characters long')

      kodeEmiten = emitenCode
    } else {
      const { emitenId } = props

      const emiten = await prisma.emiten.findUnique({ where: { id: emitenId } })

      if (!emiten) throw new Error('Emiten not found')

      kodeEmiten = emiten.kodeEmiten
    }

    // const response = await fromStockbit(kodeEmiten)

    const response = await fromIdnFinancial(kodeEmiten)

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fromIdnFinancial(kodeEmiten: string) {
  try {
    const host = 'https://www.idnfinancials.com'

    const url = `${host}/id/${kodeEmiten.toLowerCase()}`

    const axios = oldAxios.create({
      headers: {
        Referer: host,
        Origin: host,
        cookie:
          'csrftoken=khKLjoBczQ6oCnloyr9WAjOMFwKa9bcG; mid=ZaN8fgAEAAH65MUfx7o3aZi2XB4h; ig_did=8CF4AC32-9410-4BFD-8E05-0628883159D2; ig_nrcb=1; ps_l=0; ps_n=0',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    })

    const options = {
      method: 'GET',
      url: url,
      headers: { 'User-Agent': 'insomnia/8.6.1' },
    }

    const { data: htmlText } = await axios.request(options)

    const regexPrice = /<span class="price">(.*?)<\/span>/s
    const matchPrice = htmlText.match(regexPrice)
    if (!matchPrice) throw new Error('Regex price did not match')

    const regexTime = /<span class="v">(.*?)<\/span>/s
    const matchTime = htmlText.match(regexTime)
    if (!matchTime) throw new Error('Regex time did not match')

    const regexOpenPrice = /<strong class="ck">Pembukaan<\/strong> <span class="cv">(.*?)<\/span>/s
    const matchOpenPrice = htmlText.match(regexOpenPrice)
    if (!matchOpenPrice) throw new Error('Regex open price did not match')

    /**
     * The JSON data is in match[1]
     */
    if (matchPrice.length < 2 || matchTime.length < 2) throw new Error('Match length is less than 2')
    const priceStr = matchPrice[1]
    const timeStr = matchTime[1]
    const openPriceStr = matchOpenPrice[1]

    const price = Number(priceStr.replace('.', ''))
    const openPrice = Number(openPriceStr.replace('.', '').replace('IDR ', ''))
    const time = new Date(timeStr)

    return { currentPrice: price, openPrice, date: time.toISOString() }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fromStockbit(kodeEmiten: string) {
  try {
    const host = 'https://stockbit.com'

    const url = `${host}/symbol/${kodeEmiten.toUpperCase()}`

    const fetchResponse = await fetch(url)

    if (!fetchResponse.ok) throw new Error('Fetch failed')

    const htmlText = await fetchResponse.text()

    const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s

    const match = htmlText.match(regex)

    if (!match) throw new Error('Regex did not match')

    /**
     * The JSON data is in match[1]
     */
    if (match.length < 2) throw new Error('Match length is less than 2')
    const jsonText = match[1]

    const jsonData = JSON.parse(jsonText)

    if (
      !jsonData.props ||
      !jsonData.props.pageProps ||
      !jsonData.props.pageProps.company ||
      !jsonData.props.pageProps.company.price ||
      !jsonData.props.pageProps.chart ||
      !jsonData.props.pageProps.chart.prices ||
      !jsonData.props.pageProps.chart.prices.length
    ) {
      throw new Error('JSON data does not have the expected structure')
    }

    const openPriceData = jsonData.props.pageProps.chart.prices.find((price: unknown) => {
      if (!price) throw new Error('Price is falsy')
      if (typeof price !== 'object') throw new Error('Price is not an object')
      if (!('xlabel' in price)) throw new Error('Price does not have xlabel')

      return price.xlabel === '1'
    })

    if (!openPriceData) throw new Error('Open price not found')

    const openPrice = Number(openPriceData.value)

    const price = Number(jsonData.props.pageProps.company.price)

    return { currentPrice: price, openPrice, date: String(openPriceData.formatted_date) }
  } catch (error) {
    console.error(error)
    throw error
  }
}
