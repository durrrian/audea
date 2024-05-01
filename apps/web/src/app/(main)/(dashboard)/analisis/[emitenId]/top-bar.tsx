import { motion, useScroll, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import cn from '@repo/tailwind-config/cn'
import { Button, Skeleton } from '@repo/web-ui/components'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { useQuery } from '@tanstack/react-query'
import { getTextColorFromBackground } from '~/lib/get-text-color-from-background'
import { emitenIndustry } from './emiten-industry'

interface TopbarProps {
  emitenId: string
}

export function Topbar({ emitenId }: TopbarProps) {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [`${emitenId}-topbar`],
    queryFn: async () => emitenIndustry(emitenId),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  })

  const isMobile = useMediaQuery('(max-width: 768px)')

  const pathname = usePathname()

  const pathnameArr = pathname.split('/')

  const isInsideAnalisis = pathnameArr.length === 5

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className={cn(
        'md:px-10 md:pt-10 md:pb-4 p-2 sticky inset-0 z-10 bg-supercuan-secondary shadow-sm select-none flex flex-col gap-4 w-full',
      )}
    >
      <nav className='w-full h-fit flex items-center justify-between md:gap-8 gap-4 flex-nowrap bg-supercuan-secondary'>
        <Link
          className='w-fit h-fit'
          href={(() => {
            if (isInsideAnalisis) {
              return `/analisis/${pathnameArr[3]}`
            }

            return '/analisis'
          })()}
        >
          <Button
            className={cn(
              'w-fit h-fit flex items-center justify-center gap-2 md:text-lg text-sm md:px-2 px-1.5 md:py-1.5 py-1',
            )}
            variant='default'
          >
            <ArrowLeft className='md:w-6 w-4 md:h-6 h-4' />

            <span>Kembali</span>
          </Button>
        </Link>

        {isInsideAnalisis ? (
          <div className='w-full md:max-w-[400px] max-w-[100px] h-[10px] bg-supercuan-primary/10 rounded-full'>
            <motion.div
              className='w-full md:max-w-[400px] max-w-[100px] h-[10px] bg-supercuan-primary rounded-full'
              style={{ scaleX, transformOrigin: '0%' }}
            />
          </div>
        ) : null}

        {(() => {
          if (isLoading) {
            return (
              <div className='flex items-center justify-center w-fit h-fit gap-2'>
                <Skeleton className='rounded-full w-[30px] h-[30px]' />

                <div className='space-y-1'>
                  <Skeleton className='rounded-lg w-14 h-4' />

                  <Skeleton className='rounded-lg w-14 h-4' />
                </div>
              </div>
            )
          }

          if (!isSuccess) {
            return (
              <div className='flex items-center justify-center w-fit h-fit gap-2'>
                <Image
                  src='/square_logo.svg'
                  alt='Supercuan Saham logo'
                  quality={100}
                  draggable={false}
                  width={!isMobile ? 55 : 30}
                  height={!isMobile ? 55 : 30}
                />

                <div className='space-y-1'>
                  <h5 className='md:text-lg text-base font-medium'>SUPE</h5>

                  {!isMobile && (
                    <p
                      className={cn(
                        'text-xs font-normal rounded-md text-center w-fit h-fit px-2 py-1 bg-supercuan-primary text-supercuan-secondary',
                      )}
                    >
                      Error Ambil Data
                    </p>
                  )}
                </div>
              </div>
            )
          }

          return (
            <div className='flex items-center justify-center w-fit h-fit gap-2'>
              <Image
                src={`https://assets.stockbit.com/logos/companies/${data.kodeEmiten}.png`}
                alt={`${data.kodeEmiten} logo`}
                quality={100}
                draggable={false}
                width={!isMobile ? 55 : 30}
                height={!isMobile ? 55 : 30}
              />

              <div className='space-y-1'>
                <h5 className='md:text-lg text-base font-medium'>{data.kodeEmiten}</h5>
                {!isMobile && (
                  <p
                    className={cn('text-xs font-normal rounded-md text-center w-fit h-fit px-2 py-1')}
                    style={{
                      backgroundColor: `#${data.industry.hexCode}`,
                      color: getTextColorFromBackground(data.industry.hexCode),
                    }}
                  >
                    {data.industry.name}
                  </p>
                )}
              </div>
            </div>
          )
        })()}
      </nav>
    </motion.div>
  )
}
