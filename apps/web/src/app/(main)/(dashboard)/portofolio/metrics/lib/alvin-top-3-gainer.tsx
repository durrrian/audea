import { formatDate } from '@repo/helper'
import type { PortofolioColumns } from '@repo/api'
import { TopGainerLoser } from '../component/top-gainer-loser'

interface AlvinTop3GainerProps {
  portofolio: PortofolioColumns[]
}

export function AlvinTop3Gainer({ portofolio }: AlvinTop3GainerProps) {
  const data = portofolio.sort((a, b) => b['Ptsl (+/-) %'] - a['Ptsl (+/-) %']).slice(0, 3)

  return (
    <TopGainerLoser
      title={"Alvin's top 3 Gainer"}
      subtitle={`Tanggal ${formatDate(new Date(), 'long')}`}
      tableHeader={['Emiten', 'Ptsl (+/-)', 'Ptsl (+/-) %', 'Last Price']}
      data={data}
    />
  )
}
