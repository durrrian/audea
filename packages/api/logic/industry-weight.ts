import type { Emiten, Industry } from '@repo/prisma/client'
import type { PortofolioColumns } from './make-portofolio'

export interface IndustryData {
  name: string
  weight: number
}

export const industryWeight = (
  portofolio: PortofolioColumns[],
  allIndustry: Industry[],
  allEmiten: Emiten[],
): IndustryData[] => {
  const data = portofolio
    .map((v) => {
      const emiten = allEmiten.find((y) => y.kodeEmiten === v.Emiten)

      const industry = allIndustry.find((y) => y.id === emiten?.industryId)

      return {
        weight: v['Weight %'],
        emitenCode: v.Emiten,
        industry: industry ?? allIndustry[0],
      }
    })
    .reduce((acc: IndustryData[], item) => {
      const existingItem = acc.find((el) => el.name === item.industry.name)
      if (existingItem) {
        existingItem.weight += item.weight
      } else {
        acc.push({
          name: item.industry.name,
          weight: item.weight,
        })
      }
      return acc
    }, [])
    .sort((a, b) => b.weight - a.weight)

  return data
}
