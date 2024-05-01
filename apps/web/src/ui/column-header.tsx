'use client'

import type { Column } from '@tanstack/table-core'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Button } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'

export function ColumnHeader<T>({ column }: { column: Column<T> }) {
  return (
    <div className='w-full h-fit flex items-center justify-center'>
      <Button
        variant={(() => {
          if (column.getIsSorted() === 'asc') {
            return 'default'
          }
          if (column.getIsSorted() === 'desc') {
            return 'secondary'
          }

          return 'ghost'
        })()}
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
        className={cn('whitespace-nowrap w-full h-fit')}
      >
        {column.id}

        {(() => {
          if (column.getIsSorted() === 'asc') {
            return <ArrowUp className='ml-2 h-4 w-4' />
          }

          if (column.getIsSorted() === 'desc') {
            return <ArrowDown className='ml-2 h-4 w-4' />
          }

          return <ArrowUpDown className='ml-2 h-4 w-4' />
        })()}
      </Button>
    </div>
  )
}
