import { prisma } from '@repo/prisma'
import { rupiah } from '@repo/helper'
import { AllPortofolio } from './all-portofolio'
import { WallOfDeath } from './wall-of-death'
import { LatestTransaction } from './latest-transaction'

export const maxDuration = 300

export default async function Page() {
  const allEmiten = await prisma.emiten.findMany()

  const allTransactions = await prisma.stockTransaction.findMany({ orderBy: [{ time: 'desc' }] })

  const cash = await prisma.cash.aggregate({ _sum: { amount: true } })

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none'>
      <section className='space-y-14'>
        <AllPortofolio allTransactions={allTransactions} allEmiten={allEmiten} />

        <div className='w-full h-fit flex items-center justify-center'>
          <p>Current cash on hand: {rupiah(cash._sum.amount ?? 0)}</p>
        </div>

        <WallOfDeath allTransactions={allTransactions} allEmiten={allEmiten} />

        <LatestTransaction />
      </section>
    </main>
  )
}
