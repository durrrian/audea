import { formatDate, rupiah } from '@repo/helper'
import TextDisplay from '../component/text-display'

interface MarketValueProps {
  marketValue: number
}

export function MarketValue({ marketValue }: MarketValueProps) {
  return (
    <TextDisplay title='Total portofolio value' subtitle={`Per tanggal ${formatDate(new Date(), 'long')}.`}>
      <div className='flex w-full items-center justify-start'>
        <p className='text-xl font-medium md:text-2xl' suppressHydrationWarning>
          {rupiah(marketValue)}
        </p>
      </div>
    </TextDisplay>
  )
}
