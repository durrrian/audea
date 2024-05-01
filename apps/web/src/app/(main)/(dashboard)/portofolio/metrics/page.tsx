import { prisma } from '@repo/prisma'
import { makePortofolio } from '@repo/api'
import {
  AlvinTop3Gainer,
  AlvinTop3Loser,
  CummulativeVsIhsg,
  HeadToHeadVsIhsg,
  IndustryWeight,
  MarketValue,
  MonthlyReturn,
  StockWeight,
  Top3GainerToday,
  Top3LoserToday,
} from './lib'

export default async function Page() {
  const allEmiten = await prisma.emiten.findMany()

  const allTransactions = await prisma.stockTransaction.findMany({ orderBy: [{ time: 'desc' }] })

  const allIndustry = await prisma.industry.findMany()

  const returnVsIndex = await prisma.returnVsIndex.findMany({ orderBy: [{ startPeriod: 'asc' }] })

  const portofolio = await makePortofolio(allTransactions, allEmiten)

  return (
    <main className='mx-auto mb-20 mt-10 h-fit w-full max-w-[1700px] select-none px-4 md:px-2'>
      <section className='grid w-full gap-4'>
        <section className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
          <MarketValue marketValue={portofolio.totalPortofolioValue} />

          <MonthlyReturn returnVsIndex={returnVsIndex} />

          <Top3GainerToday allTransactions={allTransactions} allEmiten={allEmiten} />

          <Top3LoserToday allTransactions={allTransactions} allEmiten={allEmiten} />

          <AlvinTop3Gainer portofolio={portofolio.result} />

          <AlvinTop3Loser portofolio={portofolio.result} />

          <CummulativeVsIhsg data={returnVsIndex} />

          <HeadToHeadVsIhsg data={returnVsIndex} />

          <StockWeight portofolio={portofolio.result} />

          <IndustryWeight portofolio={portofolio.result} allIndustry={allIndustry} allEmiten={allEmiten} />
        </section>
      </section>
    </main>
  )
}
