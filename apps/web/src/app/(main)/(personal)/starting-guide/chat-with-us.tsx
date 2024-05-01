'use client'

import { toast } from '@repo/web-ui/components'
import { ContentBlockerToast } from '~/ui/content-blocker-toast'
import { useIsSafari } from '~/hooks/use-is-safari'
import { useTidio } from '~/hooks/use-tidio'

export function ChatWithUs() {
  const { isTidioExist, loadTidio, openTidio } = useTidio()

  const isSafari = useIsSafari()

  return (
    <button
      className='underline'
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
              toast.custom((t) => <ContentBlockerToast t={t} />, { duration: Infinity, position: 'top-center' })
            }

            return 'Failed to load chat'
          },
        })
      }}
    >
      chat with us
    </button>
  )
}
