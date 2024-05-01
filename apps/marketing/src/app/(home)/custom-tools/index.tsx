'use client'

import { useState } from 'react'
import { Form } from './form'
import { Chart } from './chart'
import type { GetVehiclePriceOutput } from './script/scrape-multiple-times'

interface CustomToolsProps {
  stockReturnData: {
    name: string
    IHSG: number
    'Supercuan Saham': number
  }[]
}

export function CustomTools({ stockReturnData }: CustomToolsProps) {
  const [submitState, setSubmitState] = useState(false)

  const [tipe, setTipe] = useState<GetVehiclePriceOutput>({ tipeKendaraan: '', nilaiJual: '' })

  return (
    <section
      className='max-w-[1400px] mx-auto flex flex-col items-center justify-center px-2 scroll-mt-10 w-full'
      id='tools'
    >
      <header className='mx-auto max-w-7xl pt-2 text-center'>
        <div className='mx-auto mb-5 w-14 h-14 rounded-full bg-gradient-to-br from-supercuan-primary to-supercuan-primary/60' />
        <h4 className='font-extrabold text-2xl md:text-4xl'>Cuan Calculator</h4>
        <small className='mx-auto mt-5 block max-w-md text-base md:text-lg opacity-60'>
          Honda Civic RS 2023 yang kamu beli seharga Rp 606,4 Juta, gimana kalo kamu malah invest di portofolio pilihan
          Supercuan Saham?
        </small>
      </header>

      <main className='mt-10 sm:mt-14 max-w-4xl mx-auto flex items-start gap-16 flex-wrap md:flex-nowrap'>
        <Form
          handleSubmit={(data) => {
            setTipe(data.tipe)
            setSubmitState(true)
          }}
          submitState={submitState}
        />
      </main>

      {submitState ? <Chart stockReturnData={stockReturnData} tipe={tipe} /> : null}
    </section>
  )
}
