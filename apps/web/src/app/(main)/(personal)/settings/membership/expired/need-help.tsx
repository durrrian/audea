'use client'

import { useUser } from '@clerk/nextjs'
import { Skeleton, toast } from '@repo/web-ui/components'
import { useIsSafari } from '~/hooks/use-is-safari'
import { useTidio } from '~/hooks/use-tidio'
import { ContentBlockerToast } from '~/ui/content-blocker-toast'

export function NeedHelp() {
  const { user, isLoaded } = useUser()

  const { isTidioExist, loadTidio, openTidio } = useTidio()

  const isSafari = useIsSafari()

  if (!isLoaded || !user) {
    return (
      <div className='flex items-center gap-x-2 flex-wrap gap-y-0'>
        <p>Butuh bantuan? hubungi tim Supercuan Saham melalui</p>
        <Skeleton className='h-[22px] w-[73px] rounded-full' />
      </div>
    )
  }

  return (
    <p>
      Butuh bantuan? hubungi tim Supercuan Saham melalui{' '}
      <button
        className='underline text-supercuan-primary'
        type='button'
        onClick={() => {
          if (isTidioExist) {
            openTidio()
            return
          }

          toast.promise(loadTidio(), {
            loading: 'Loading chat...',
            success: 'Chat loaded!',
            error: () => {
              if (isSafari) {
                // eslint-disable-next-line react/no-unstable-nested-components -- its okay
                toast.custom((t) => <ContentBlockerToast t={t} />, {
                  duration: Infinity,
                  position: 'top-center',
                })
              }

              return 'Failed to load chat'
            },
          })
        }}
      >
        fitur chat
      </button>
    </p>
  )
}
