import dynamic from 'next/dynamic'
import { getTransaction } from './get-transaction'

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>
}

const Client = dynamic(async () => import('./client'), { ssr: false })

export default async function Page({ searchParams }: PageProps) {
  let initialSearchTerm: string | undefined

  if (searchParams.emiten) {
    initialSearchTerm = searchParams.emiten.toString()
  }

  const initialData = await getTransaction()

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto select-none'>
      <Client initialData={initialData} initialSearchTerm={initialSearchTerm} />
    </main>
  )
}
