'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle, Skeleton } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useQuery } from '@tanstack/react-query'
import Logo from '@repo/assets/logo/logo.svg'
import { HeadingWithLogo } from '~/ui/heading-with-logo'
import { instagramProfile } from './instagram-profile'
import { instagramMedia } from './instagram-media'

export function Instagram() {
  const [hoverId, setHoverId] = useState<null | number>(null)

  const {
    data: instagramProfileData,
    error: errorInstagramProfile,
    isLoading: isLoadingInstagramProfile,
  } = useQuery({ queryKey: ['instagramProfile'], queryFn: async () => instagramProfile() })

  const {
    data: instagramMediaData,
    error: errorInstagramMedia,
    isLoading: isLoadingInstagramMedia,
  } = useQuery({ queryKey: ['instagramMedia'], queryFn: async () => instagramMedia() })

  return (
    <section className='flex flex-col items-center justify-center gap-14 transform-gpu max-w-[100dvw] overflow-x-hidden select-none'>
      {/* Header */}
      <section className='text-center space-y-10'>
        <HeadingWithLogo>Instagram</HeadingWithLogo>

        <section className='relative px-2'>
          {(() => {
            if (isLoadingInstagramProfile) {
              // profile is loading
              return (
                <section className='relative flex flex-row items-center justify-center flex-wrap md:gap-20 gap-10 px-2'>
                  <Skeleton className='w-[125px] h-[125px] rounded-full' />

                  <section className='flex flex-col items-center justify-center gap-4'>
                    <section className='flex items-center justify-center gap-8 font-light w-fit h-fit flex-wrap'>
                      <Skeleton className='w-[70px] h-[32px] rounded-full' />
                      <Skeleton className='w-[133px] h-[32px] rounded-full' />
                      <Skeleton className='w-[85px] h-[32px] rounded-full' />
                    </section>

                    <Skeleton className='w-full h-[72px] rounded-md' />
                  </section>
                </section>
              )
            }

            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- what?
            if (errorInstagramProfile || !instagramProfileData) {
              // fetching profile error
              return (
                <section className='flex flex-col items-center justify-center gap-4'>
                  <section className='relative flex flex-row items-center justify-center flex-wrap md:gap-20 gap-10 px-2'>
                    <div className='flex items-center justify-center w-[125px] h-[125px] rounded-full border border-supercuan-greyPrimary overflow-hidden'>
                      <Image
                        src={Logo}
                        alt='Supercuan Saham Instagram Profile Picture'
                        quality={100}
                        draggable={false}
                        width={100}
                        height={100}
                      />
                    </div>

                    <section className='flex flex-col items-center justify-center gap-4'>
                      <section className='flex items-center justify-center gap-8 font-light w-fit h-fit flex-wrap'>
                        <p>
                          <span className='font-medium text-2xl max-w-[74.02px] truncate'>61</span> Posts
                        </p>
                        <p>
                          <span className='font-medium text-2xl max-w-[88.83px] truncate'>2,323</span> Followers
                        </p>
                        <p>
                          <span className='font-medium text-2xl max-w-[74.02px] truncate'>1</span> Following
                        </p>
                      </section>

                      <p className='text-justify max-w-[500px]'>
                        {
                          'Value-investing focused channel by @alvintanasta \n📈 Bantu kamu cuan konsisten & jangka panjang\n⬇️ Ikutin porto sahamku & beat the market!'
                        }
                      </p>
                    </section>
                  </section>

                  <Alert variant='destructive' className={cn('text-left text-sm')}>
                    <AlertCircle className='h-4 w-4 text-supercuan-error' />
                    <AlertTitle>Whoops!</AlertTitle>
                    <AlertDescription>
                      There is an error fetching Supercuan Saham&apos;s Instagram profile. The details above is not the
                      up-to-date data.
                    </AlertDescription>
                  </Alert>
                </section>
              )
            }

            // success
            return (
              <section className='relative flex flex-row items-center justify-center flex-wrap md:gap-20 gap-10 px-2'>
                <div className='flex items-center justify-center w-[125px] h-[125px] rounded-full border border-supercuan-greyPrimary overflow-hidden'>
                  <Image
                    src={instagramProfileData.profile_picture_url}
                    alt='Supercuan Saham Instagram Profile Picture'
                    quality={100}
                    draggable={false}
                    width={125}
                    height={125}
                  />
                </div>

                <section className='flex flex-col items-center justify-center gap-4'>
                  <section className='flex items-center justify-center gap-8 font-light w-fit h-fit flex-wrap'>
                    <p>
                      <span className='font-medium text-2xl max-w-[74.02px] truncate'>
                        {Number(instagramProfileData.media_count).toLocaleString()}
                      </span>{' '}
                      Posts
                    </p>
                    <p>
                      <span className='font-medium text-2xl max-w-[88.83px] truncate'>
                        {Number(instagramProfileData.followers_count).toLocaleString()}
                      </span>{' '}
                      Followers
                    </p>
                    <p>
                      <span className='font-medium text-2xl max-w-[74.02px] truncate'>
                        {Number(instagramProfileData.follows_count).toLocaleString()}
                      </span>{' '}
                      Following
                    </p>
                  </section>

                  <p className='text-justify max-w-[500px]'>{instagramProfileData.biography}</p>
                </section>
              </section>
            )
          })()}
        </section>
      </section>

      {/* Content */}
      <section
        className={cn(
          'max-w-[1200px] min-w-[1200px] mx-auto relative',
          isLoadingInstagramMedia || instagramMediaData !== null ? 'grid grid-cols-4' : '',
        )}
      >
        {(() => {
          if (isLoadingInstagramMedia) {
            // profile is loading
            return (
              <>
                {new Array(8).fill(0).map((_, i) => {
                  // eslint-disable-next-line react/no-array-index-key -- no value
                  return <Skeleton className='w-[300px] h-[300px] border border-supercuan-primary' key={i} />
                })}
              </>
            )
          }

          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- what?
          if (errorInstagramMedia || !instagramMediaData) {
            // fetching profile error
            return (
              <div className='w-[1200px] h-[600px] bg-supercuan-greyPrimary text-supercuan-primary'>
                <div className='w-full h-full max-w-[100dvw] flex items-center justify-center text-center'>
                  ❌ Error fetching Supercuan Saham&apos;s Instagram media
                </div>
              </div>
            )
          }

          // success
          return (
            <>
              {instagramMediaData.map((v, i) => {
                return (
                  <div
                    key={v.id}
                    className='relative w-[300px] h-[300px] border border-supercuan-primary'
                    onMouseEnter={() => {
                      setHoverId(i)
                    }}
                    onMouseLeave={() => {
                      setHoverId(null)
                    }}
                  >
                    <motion.div
                      className='w-[300px] h-[300px] aspect-square overflow-hidden'
                      animate={{ opacity: hoverId === i ? 0.1 : 1 }}
                    >
                      <Image
                        src={v.media_url}
                        alt={v.caption}
                        width={300}
                        height={300}
                        className='w-[300px]'
                        draggable={false}
                      />
                    </motion.div>

                    {hoverId === i && (
                      <motion.div
                        className='absolute inset-0 w-[250px] h-[250px] text-left m-auto overflow-y-auto overflow-x-hidden'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p>{v.caption}</p>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </>
          )
        })()}
      </section>

      <a
        href='https://www.instagram.com/supercuanporto/'
        target='_blank'
        className='w-fit h-fit bg-supercuan-primary px-4 py-3 rounded-xl text-supercuan-secondary text-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer'
        rel='noopener'
      >
        Kunjungi Instagram <ExternalLink className='w-6 h-6' />
      </a>
    </section>
  )
}
