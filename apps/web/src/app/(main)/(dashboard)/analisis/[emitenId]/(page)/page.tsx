import { notFound, redirect } from 'next/navigation'
import { currentProfile } from '@repo/clerk-action'
import { Client } from './client'
import { analisisList } from './analisis-list'

interface PageProps {
  params: { emitenId: string }
}

export default async function Page({ params }: PageProps) {
  if (!params.emitenId) return notFound()

  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const emitenId = params.emitenId

  const emiten = await analisisList(emitenId, user.id)

  if (!emiten) return notFound()

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto select-none'>
      <Client initialData={emiten} emitenId={emitenId} userId={user.id} />
    </main>
  )
}
