'use client'

import type { ColumnDef } from '@tanstack/table-core'
import { ExternalLink, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import type { WallOfDeathColumns } from '@repo/api'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@repo/web-ui/components'
import { formatDate } from '@repo/helper'
import { EmitenLogo } from '~/ui/emiten-logo'
import { ColumnHeader } from '~/ui/column-header'
import { LastPrice } from '~/ui/last-price'

export const columns: ColumnDef<WallOfDeathColumns>[] = [
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
    accessorKey: 'Avg buy price',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => <div className='text-center'>{row.getValue('Avg buy price')}</div>,
  },
  {
    accessorKey: 'Avg sell price',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => <div className='text-center'>{row.getValue('Avg sell price')}</div>,
  },
  {
    accessorKey: 'Last price',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => <LastPrice emitenCode={String(row.getValue('Emiten'))} lastPrice={row.getValue('Last price')} />,
  },
  {
    accessorKey: 'Time of sell',
    header: ({ column }) => <ColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className='text-center'>{formatDate(new Date(row.getValue('Time of sell')), 'long', true)}</div>
    ),
    enableHiding: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/portofolio/transaksi?emiten=${row.getValue('Emiten')}`}
                className='flex items-center justify-center gap-2'
              >
                View transactions <ExternalLink className='w-4 h-4' />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
