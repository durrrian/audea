import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, ChevronsUpDown } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Button,
  Card,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  LoadingSpinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Form as FormComponent,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  CommandList,
} from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jenOptions, merOptions, yearOptions } from './data'
import { script } from './script'

const FormSchema = z.object({
  jenis: z.enum(['10', '20', '32', '70'], { required_error: 'Tolong pilih jenis kendaraan.' }),
  tahun: z.string({
    required_error: 'Tolong pilih tahun kendaraan.',
  }),
  merek: z.string({ required_error: 'Tolong pilih merek kendaraan.' }),
  tipe: z.object({ tipeKendaraan: z.string(), nilaiJual: z.string() }),
})

export type InferSchema = z.infer<typeof FormSchema>

interface FormProps {
  handleSubmit: (data: InferSchema) => void
  submitState: boolean
}

export function Form({ handleSubmit, submitState }: FormProps) {
  const form = useForm<InferSchema>({
    values: { jenis: '10', tahun: '', merek: '', tipe: { tipeKendaraan: '', nilaiJual: '' } },
    resolver: zodResolver(FormSchema),
  })

  const [tipeOptionsOpen, setTipeOptionsOpen] = useState(false)

  const jenis = form.watch('jenis')
  const merek = form.watch('merek')
  const tahun = form.watch('tahun')
  const tipe = form.watch('tipe')

  const { data, isError, isLoading, isRefetching } = useQuery({
    queryKey: ['vehiclePrice', jenis, merek, tahun],
    queryFn: async () => script({ JEN: jenis, THN: tahun, MER: merek }),
    enabled: Boolean(jenis) && Boolean(merek) && Boolean(tahun),
  })

  useEffect(() => {
    form.setValue('tipe', { tipeKendaraan: '', nilaiJual: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need to rerender
  }, [jenis, merek, tahun])

  return (
    <Card className={cn('w-full md:w-1/2 flex-grow p-5 md:p-10 bg-supercuan-primary space-y-12')}>
      <FormComponent {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <motion.div
            transition={{ type: 'spring', duration: 0.5 }} // Define transition here
            className={cn('grid gap-6', submitState ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1')}
            layout
          >
            <FormField
              control={form.control}
              name='jenis'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-supercuan-secondary'>Jenis Kendaraan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'w-full bg-supercuan-secondary',
                          jenis ? 'text-supercuan-primary opacity-100' : 'text-supercuan-primary opacity-50',
                        )}
                        disabled={submitState || isLoading || isRefetching}
                      >
                        <SelectValue placeholder='Pilih jenis kendaraan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-supercuan-secondary'>
                      {jenOptions.map((v) => (
                        <SelectItem value={v.value} key={v.value} className='focus:bg-supercuan-primary/10'>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!submitState && <FormMessage className='text-red-500' />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='tahun'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-supercuan-secondary'>Tahun produksi</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'w-full bg-supercuan-secondary',
                          tahun ? 'text-supercuan-primary opacity-100' : 'text-supercuan-primary opacity-50',
                        )}
                        disabled={!jenis || submitState || isLoading || isRefetching}
                      >
                        <SelectValue placeholder='Pilih tahun produksi kendaraan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={cn('w-full bg-supercuan-secondary')}>
                      <SelectGroup>
                        <SelectLabel>Tahun</SelectLabel>
                        {yearOptions.map((v) => {
                          return (
                            <Fragment key={v}>
                              {/* eslint-disable-next-line react/no-unstable-nested-components -- no need */}
                              {(() => {
                                if (v === '2024') {
                                  return (
                                    <SelectItem value={v} disabled className='focus:bg-supercuan-primary/10'>
                                      {v}
                                    </SelectItem>
                                  )
                                }

                                return (
                                  <SelectItem value={v} className='focus:bg-supercuan-primary/10'>
                                    {v}
                                  </SelectItem>
                                )
                              })()}
                            </Fragment>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {!submitState && <FormMessage className='text-red-500' />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='merek'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-supercuan-secondary'>Merek Kendaraan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'w-full bg-supercuan-secondary',
                          merek ? 'text-supercuan-primary opacity-100' : 'text-supercuan-primary opacity-50',
                        )}
                        disabled={!jenis || !tahun || submitState || isLoading || isRefetching}
                      >
                        <SelectValue placeholder='Pilih merek kendaraan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className={cn('w-full bg-supercuan-secondary')}>
                      {merOptions
                        .sort(({ value: valueA }, { value: valueB }) => {
                          if (valueA < valueB) return -1 // Name A comes before name B
                          if (valueA > valueB) return 1 // Name A comes after name B
                          return 0 // Names are equal
                        })
                        .map((v) => (
                          <SelectItem value={v.value} key={v.value} className='focus:bg-supercuan-primary/10'>
                            {v.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {!submitState && <FormMessage className='text-red-500' />}
                </FormItem>
              )}
            />

            {(() => {
              if (isLoading || isRefetching) {
                return (
                  <div className='flex items-center justify-center gap-2'>
                    <LoadingSpinner className='w-4 h-4' />
                    <p className='text-sm text-supercuan-secondary'>Lagi ambil data...</p>
                  </div>
                )
              }

              if (isError) {
                return <p className='text-sm text-supercuan-error'>Error ambil data.</p>
              }

              if (data) {
                return (
                  <FormField
                    control={form.control}
                    name='tipe'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-supercuan-secondary'>Variant Kendaraan</FormLabel>
                        <Popover open={tipeOptionsOpen} onOpenChange={setTipeOptionsOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                aria-expanded={tipeOptionsOpen}
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'opacity-50',
                                  'border border-supercuan-secondary bg-supercuan-secondary hover:bg-supercuan-secondary hover:text-supercuan-primary font-normal',
                                )}
                                disabled={
                                  (!merek && !data.length && data.length === 0) ||
                                  submitState ||
                                  isLoading ||
                                  isRefetching
                                }
                              >
                                {(() => {
                                  if (field.value) {
                                    const find = data.find(
                                      (dataTipe) => dataTipe.tipeKendaraan === field.value?.tipeKendaraan,
                                    )

                                    if (find) {
                                      return find.tipeKendaraan
                                    }

                                    return 'Select variant kendaraan...'
                                  }

                                  return 'Select variant kendaraan...'
                                })()}
                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-full p-0 bg-supercuan-secondary'>
                            <Command>
                              <CommandInput placeholder='Cari variant kendaraan...' />

                              <CommandList>
                                <CommandEmpty>Tidak ada variant kendaraan.</CommandEmpty>

                                <CommandGroup>
                                  {data.map((v) => (
                                    <CommandItem
                                      key={v.tipeKendaraan}
                                      value={v.tipeKendaraan}
                                      onSelect={(val) => {
                                        const findTipe = data.find((y) => y.tipeKendaraan === val)

                                        if (findTipe) form.setValue('tipe', findTipe)

                                        setTipeOptionsOpen(false)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          tipe && tipe.tipeKendaraan === v.tipeKendaraan ? 'opacity-100' : 'opacity-0',
                                        )}
                                      />

                                      {v.tipeKendaraan}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {!submitState && (
                          <FormDescription className='text-supercuan-secondary'>
                            Bingung? Cek STNK kamu!
                          </FormDescription>
                        )}

                        {!submitState && <FormMessage className='text-red-500' />}
                      </FormItem>
                    )}
                  />
                )
              }
            })()}

            {!submitState && (
              <Button
                type='submit'
                className={cn(
                  'w-full bg-supercuan-secondary text-supercuan-primary hover:bg-supercuan-secondary/90',
                  'mt-4',
                )}
                disabled={!merek || !jenis || !tahun || !tipe.nilaiJual || !tipe.tipeKendaraan}
              >
                Cek Cuan
              </Button>
            )}
          </motion.div>
        </form>
      </FormComponent>

      {!submitState && (
        <p className='text-left text-sm text-supercuan-secondary'>
          Data diambil dari website resmi Badan Pendapatan Daerah Provinsi DKI Jakarta:{' '}
          <Link
            href='https://samsat-pkb.jakarta.go.id/INFO_NJKB'
            target='_blank'
            className='text-red-600 underline whitespace-nowrap'
          >
            https://samsat-pkb.jakarta.go.id/INFO_NJKB
          </Link>
        </p>
      )}
    </Card>
  )
}
