import { redirect } from 'next/navigation'
import { currentProfile } from '@repo/clerk-action'
import { EmitenList } from './emiten-list'
import { getEmiten } from './get-emiten'
import { getNonEmitenList } from './get-non-emiten-list'
import { NonEmitenList } from './non-emiten-list'

export default async function Page() {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const initialEmiten = await getEmiten(user.id)

  const initialNonEmiten = await getNonEmitenList(user.id)

  const doesNotHaveNonEmiten = initialNonEmiten.length === 0

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none flex flex-col gap-10'>
      {!doesNotHaveNonEmiten && <NonEmitenList initialData={initialNonEmiten} userId={user.id} />}

      {!doesNotHaveNonEmiten && (
        <div className='w-full overflow-hidden leading-[0] rotate-180'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className='relative block w-full h-[10px]'
          >
            <path
              d='M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z'
              className='fill-supercuan-primary'
            />
          </svg>
        </div>
      )}

      <EmitenList initialEmiten={initialEmiten} userId={user.id} />
    </main>
  )
}
