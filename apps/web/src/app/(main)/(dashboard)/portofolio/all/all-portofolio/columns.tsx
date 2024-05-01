'use client'

import type { ColumnDef } from '@tanstack/table-core'
import { rupiah } from '@repo/helper'
import cn from '@repo/tailwind-config/cn'
import type { PortofolioColumns } from '@repo/api'
import { EmitenLogo } from '~/ui/emiten-logo'
import { ColumnHeader } from '~/ui/column-header'
import { LastPrice } from '~/ui/last-price'

export const columns: ColumnDef<PortofolioColumns>[] = [
  {
    accessorKey: 'Emiten',
    header: ({ column }) => <ColumnHeader column={column} />,
    enableHiding: false,
    cell: ({ row }) => (
      <div className='text-center font-medium flex items-center justify-center gap-2'>
        <EmitenLogo kodeEmiten={row.getValue('Emiten')} size={25} />
        <p>{row.getValue('Emiten')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'Avg Price',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => <div className='text-center'>{row.getValue('Avg Price')}</div>,
  },
  {
    accessorKey: 'Last Price',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => <LastPrice emitenCode={String(row.getValue('Emiten'))} lastPrice={row.getValue('Last Price')} />,
  },
  {
    accessorKey: 'Lot',
    header: ({ column }) => <ColumnHeader column={column} />,
    enableHiding: false,
    cell: ({ row }) => <div className='text-center font-medium'>{row.getValue('Lot')}</div>,
  },
  {
    accessorKey: 'Value',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <div className='text-center flex items-center justify-center font-medium'>{rupiah(row.getValue('Value'))}</div>
      )
    },
  },
  {
    accessorKey: 'Ptsl (+/-)',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('Ptsl (+/-)'))
      const isPositive = value > 0

      return (
        <div
          className={cn(
            `text-center font-medium`,
            (() => {
              if (isPositive) {
                return 'text-green-600'
              }

              if (value === 0) {
                return ''
              }

              return 'text-red-600'
            })(),
          )}
        >
          {rupiah(value)}
        </div>
      )
    },
  },
  {
    accessorKey: 'Ptsl (+/-) %',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('Ptsl (+/-) %')) * 100
      const isPositive = value > 0

      const formatted = `${value.toFixed(2)}%`

      return (
        <div
          className={cn(
            `text-center font-medium`,
            (() => {
              if (isPositive) {
                return 'text-green-600'
              }

              if (value === 0) {
                return ''
              }

              return 'text-red-600'
            })(),
          )}
        >
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: 'Weight %',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('Weight %')) * 100

      const formatted = `${value.toFixed(2)}%`

      return <div className={cn(`text-center`)}>{formatted}</div>
    },
  },
  {
    accessorKey: 'Change (lot)',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => {
      const value = row.getValue('Change (lot)') ? String(row.getValue('Change (lot)')) : null

      const isBuy = value?.startsWith('+')

      return <div className={cn(`text-center`, isBuy ? 'text-green-600' : 'text-red-600')}>{value}</div>
    },
  },
]
