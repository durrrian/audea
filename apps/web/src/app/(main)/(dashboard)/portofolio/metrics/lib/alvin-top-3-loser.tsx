import { formatDate } from '@repo/helper'
import type { PortofolioColumns } from '@repo/api'
import { TopGainerLoser } from '../component/top-gainer-loser'

interface AlvinTop3LoserProps {
  portofolio: PortofolioColumns[]
}

export function AlvinTop3Loser({ portofolio }: AlvinTop3LoserProps) {
  const data = portofolio.sort((a, b) => a['Ptsl (+/-) %'] - b['Ptsl (+/-) %']).slice(0, 3)

  return (
    <TopGainerLoser
      title={"Alvin's top 3 Loser"}
      subtitle={`Tanggal ${formatDate(new Date(), 'long')}`}
      tableHeader={['Emiten', 'Ptsl (+/-)', 'Ptsl (+/-) %', 'Last Price']}
      data={data}
    />
  )
}
