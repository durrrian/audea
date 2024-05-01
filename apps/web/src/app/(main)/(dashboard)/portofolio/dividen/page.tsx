import dynamic from 'next/dynamic'
import { getDividen } from './get-dividen'

const Client = dynamic(async () => import('./client'), { ssr: false })

export default async function Page() {
  const initialData = await getDividen()

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto select-none'>
      <Client initialData={initialData} />
    </main>
  )
}
