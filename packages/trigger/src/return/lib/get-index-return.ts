import { load } from 'cheerio'
import { launch } from 'puppeteer'

export async function getIndexReturn(
  index: 'IHSG' | 'LQ45',
  startPeriod: Date | string,
  endPeriod: Date | string,
): Promise<number> {
  try {
    const monthAbbrv = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const ihsg = '%5EJKSE'
    const lq45 = '%5EJKLQ45'

    const startPeriodDate = new Date(startPeriod)
    const endPeriodDate = new Date(endPeriod)

    const period1 = startPeriodDate.getTime() / 1000
    const period2 = endPeriodDate.getTime() / 1000

    const url = `https://finance.yahoo.com/quote/${
      index === 'IHSG' ? ihsg : lq45
    }/history?period1=${period1}&period2=${period2}&frequency=1mo`

    const browser = await launch()
    const page = await browser.newPage()

    await page.goto(url)

    const content = await page.content()

    const $ = load(content)

    const month = monthAbbrv[endPeriodDate.getMonth()] // Can use start or end period

    const monthData: { open: number; close: number }[] = []

    $('.table-container .table').each((_, element) => {
      const date = $(element).find('td:nth-child(1)').text().trim()

      if (date.includes(month)) {
        const openPrice = $(element).find('td:nth-child(2)').text().trim().replace(/,/g, '')
        const closePrice = $(element).find('td:nth-child(5)').text().trim().replace(/,/g, '')
        monthData.push({ open: parseFloat(openPrice), close: parseFloat(closePrice) })
      }
    })

    console.log(`For ${index}: ${JSON.stringify(monthData, null, 2)}`)

    const monthReturn = (monthData[0].close - monthData[0].open) / Math.abs(monthData[0].open)

    console.log(`Return for ${index} = ${monthReturn}`)

    return monthReturn * 100
  } catch (error) {
    console.error(error)
    throw error
  }
}
