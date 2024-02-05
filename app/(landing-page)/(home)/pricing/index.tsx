'use client'

import cn from '@/utils/cn'
import { Heading } from '../lib/heading'
import { SubHeading } from '../lib/sub-heading'
import { pricingList } from '@/utils/pricing-list'
import { Alert, AlertDescription, AlertTitle, Badge, LoadingSpinner } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { getQuotas } from './get-quotas'
import { Terminal } from 'lucide-react'

export default function Pricing() {
  const { isPending, data } = useQuery({
    queryKey: ['lifetime-40-quota'],
    queryFn: () => getQuotas(),
  })

  return (
    <section
      className='text-landingPage-textSurfaceVariant dark:text-landingPage-textSurfaceVariant mx-auto flex max-w-[1300px] scroll-mt-20 flex-col items-center justify-center gap-12 bg-contain bg-top bg-no-repeat px-4 pb-10 pt-10 text-center md:bg-cover'
      style={{
        backgroundImage:
          'linear-gradient(rgba(8, 10, 25, 0.4), rgba(8, 10, 25, 0.4)), url(/landing-page/hero_light.png)',
      }}
      id='pricing'
    >
      <header className='flex flex-col gap-4'>
        <Heading as='h6'>Try it first, then pay if you love it</Heading>

        <SubHeading>
          You can try it <strong>for free</strong> for 2 weeks. Subscribe later if you love it.
        </SubHeading>
      </header>

      <section className='flex h-fit w-full flex-wrap items-center justify-center gap-8'>
        {pricingList.map(({ name, price, description, id }, i) => {
          return (
            <section
              key={i}
              className={`flex h-full min-h-[280px] w-full max-w-[300px] flex-col justify-between gap-10 rounded-2xl border p-8 ${
                name === 'Lifetime subscription'
                  ? 'from-landingPage-linierBgPricingTop via-landingPage-linierBgPricingVia to-landingPage-linierBgPricingBottom border-landingPage-borderPricingOn dark:from-landingPage-linierBgPricingTop dark:via-landingPage-linierBgPricingVia dark:to-landingPage-linierBgPricingBottom dark:border-landingPage-borderPricingOn bg-gradient-to-b'
                  : 'border-landingPage-borderPricing dark:border-landingPage-borderPricing bg-transparent'
              }`}
            >
              <section className='flex flex-col items-center justify-center gap-0'>
                <p className='text-lg font-medium'>{name}</p>
                {(() => {
                  if (id === 'monthly') {
                    return (
                      <Badge
                        className={cn(
                          'h-fit w-fit bg-yellow-300 text-black hover:bg-yellow-300 hover:text-black dark:bg-yellow-300 dark:text-black hover:dark:bg-yellow-300 hover:dark:text-black',
                        )}
                      >
                        Popular
                      </Badge>
                    )
                  }

                  if (id === 'yearly') {
                    return (
                      <Badge
                        className={cn(
                          'h-fit w-fit bg-green-300 text-black hover:bg-green-300 hover:text-black dark:bg-green-300 dark:text-black hover:dark:bg-green-300 hover:dark:text-black',
                        )}
                      >
                        Free 2 months
                      </Badge>
                    )
                  }

                  return (
                    <Badge
                      className={cn(
                        'flex h-fit w-fit items-center justify-center gap-1 bg-red-300 text-black hover:bg-red-300 hover:text-black dark:bg-red-300 dark:text-black hover:dark:bg-red-300 hover:dark:text-black',
                      )}
                    >
                      {isPending ? <LoadingSpinner /> : <span>{100 - (data ?? 0)}</span>}
                      <span>quotas</span>
                      <span>left</span>
                    </Badge>
                  )
                })()}
              </section>

              <p className='text-3xl font-bold'>${price}</p>

              <p className='from-landingPage-linierFooterTop to-landingPage-linierFooterBottom bg-gradient-to-b bg-clip-text font-normal text-transparent'>
                {description}
              </p>
            </section>
          )
        })}
      </section>

      <Alert className='mx-auto max-w-[1100px] text-left'>
        <Terminal className='h-4 w-4' />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Since we are using ChatGPT API and to keep the prices as low as possible, you are required to provided your
          own Open AI API key to use Audea. This ensures that we can keep the price as low as possible and you can use
          Audea as much as you want!
        </AlertDescription>
      </Alert>
    </section>
  )
}
