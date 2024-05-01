'use client'

import cn from '@repo/tailwind-config/cn'
import { useRef } from 'react'
import { useDateSegment } from 'react-aria'
import { DateFieldState, DateSegment as IDateSegment } from 'react-stately'

interface DateSegmentProps {
  segment: IDateSegment
  state: DateFieldState
}

function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null)

  const {
    segmentProps: { ...segmentProps },
  } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cn(
        'focus:rounded-[2px] focus:bg-accent focus:text-accent-foreground focus:outline-none',
        segment.type !== 'literal' ? 'px-[1px]' : '',
        segment.isPlaceholder ? 'text-muted-foreground' : '',
      )}
    >
      {segment.text}
    </div>
  )
}

export { DateSegment }
