import { load } from 'cheerio'

export function scrapeData(html: string) {
  const $ = load(html)
  const valForNextLoad = $('input[type="hidden"][name="PUPD"]').val()?.toString()
  const data: { tipeKendaraan: string; nilaiJual: string }[] = []

  $('div[class="CSSTabGenerator"] table tbody tr')
    .slice(1)
    .each((_, element) => {
      const tipeKendaraan = $(element).find('td:nth-child(3)').text().trim()
      const nilaiJual = $(element).find('td:nth-child(4)').text().trim()
      if (tipeKendaraan && nilaiJual) {
        data.push({ tipeKendaraan, nilaiJual })
      }
    })

  return { valForNextLoad, data }
}
