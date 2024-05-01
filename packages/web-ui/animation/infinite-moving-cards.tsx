'use client'

import cn from '@repo/tailwind-config/cn'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback } from '../components'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = '100s',
  pauseOnHover = true,
  withShadow = true,
  sameHeight = true,
  containerClassName,
  itemClassName,
  footerClassName,
}: {
  items: {
    syntax: React.ReactNode
    from: string
    cred?: string
    img?: string | StaticImport | null
  }[]
  direction?: 'left' | 'right'
  speed?: `${number}s`
  pauseOnHover?: boolean
  withShadow?: boolean
  sameHeight?: boolean
  containerClassName?: string
  itemClassName?: string
  footerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])

  const [start, setStart] = useState(false)

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards')
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse')
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--animation-duration', speed)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 w-full overflow-hidden',
        withShadow && '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        containerClassName,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item) => (
          <li
            className={cn(
              'w-[350px] max-w-full relative rounded-2xl border border-b-0 border-slate-700 md:w-[450px] h-fit overflow-hidden',
              itemClassName,
            )}
            key={item.from}
          >
            <blockquote>
              {sameHeight && (
                <div
                  aria-hidden='true'
                  className='user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]'
                />
              )}

              <div className='relative z-20 text-sm leading-[1.6] font-normal flex flex-col gap-y-4 text-justify px-8 py-6'>
                {item.syntax}
              </div>

              <div className={cn('relative z-20 mt-6 flex flex-row items-center gap-x-4 px-8 py-6', footerClassName)}>
                <div className='rounded-full overflow-hidden w-[40px] h-[40px]'>
                  {item.img ? (
                    <Image src={item.img} alt={`${item.from} profile`} width={40} height={40} draggable={false} />
                  ) : (
                    <Avatar className='w-[40px] h-[40px]'>
                      <AvatarFallback className='bg-supercuan-secondary text-supercuan-primary'>
                        {item.from[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <span className='flex flex-col gap-1'>
                  <span className=' text-sm leading-[1.6] font-normal'>{item.from}</span>
                  {item.cred && <span className=' text-sm leading-[1.6] font-normal'>{item.cred}</span>}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
