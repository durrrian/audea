import { getCummulativeStockData, membershipPrice } from '@repo/api'
import { getMetrics } from '~/lib/get-metrics'
import { getAllArticle } from '~/lib/get-all-article'
import { Hero } from './hero'
import { RunningText } from './running-text'
import { ServiceOffered } from './service-offered'
import { Bio } from './bio'
import { PickMembership } from './pick-membership'
import { Metrics } from './metrics'
import { Testimonial } from './testimonial'
import { ArticleList } from './article-list'
import { Instagram } from './instagram'
import { CustomTools } from './custom-tools'

export default async function Page() {
  const cummulativeStockData = await getCummulativeStockData()

  const newPrices = await membershipPrice()

  const metricsInitial = await getMetrics(cummulativeStockData)

  const allArticle = await getAllArticle()

  return (
    <main className='w-full h-fit flex flex-col gap-36'>
      <Hero cummulativeStockData={cummulativeStockData} />

      <RunningText />

      <ServiceOffered />

      <Bio />

      <PickMembership prices={newPrices} />

      <Metrics metricsInitial={metricsInitial} cummulativeStockData={cummulativeStockData} />

      <CustomTools stockReturnData={cummulativeStockData} />

      <Testimonial />

      <ArticleList initialData={allArticle} />

      <Instagram />
    </main>
  )
}
