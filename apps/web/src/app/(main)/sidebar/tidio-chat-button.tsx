import cn from '@repo/tailwind-config/cn'
import { toast } from '@repo/web-ui/components'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { ContentBlockerToast } from '~/ui/content-blocker-toast'
import { useIsSafari } from '~/hooks/use-is-safari'
import { useSidebar } from '~/hooks/use-sidebar'
import { useTidio } from '~/hooks/use-tidio'

export function TidioChatButton() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { isSidebarOpen } = useSidebar()

  const isSafari = useIsSafari()

  const { isTidioExist, loadTidio, active, openTidio } = useTidio()

  return (
    <motion.button
      type='button'
      animate={{ opacity: 1 }}
      whileHover={{
        // eslint-disable-next-line no-nested-ternary -- quite readable
        scale: active ? 1 : isMobile ? 1.03 : 1.05,
      }}
      className={cn(
        'w-full flex items-center rounded-md cursor-pointer',
        (() => {
          if (isMobile) {
            return 'justify-start p-2'
          }

          if (isSidebarOpen && !isMobile) {
            return 'justify-between px-2 py-1.5'
          }

          return 'justify-center p-2'
        })(),

        (() => {
          const baseClassNames = 'hover:bg-primary hover:text-primary-foreground hover:bg-opacity-20'

          // eslint-disable-next-line no-nested-ternary -- mager fix
          const activeClassNames = active
            ? isMobile
              ? 'text-supercuan-secondary bg-supercuan-primary focus:bg-supercuan-primary focus:text-supercuan-secondary'
              : 'bg-supercuan-secondary text-supercuan-primary'
            : baseClassNames

          const inactiveMobileClassNames =
            isMobile && !active
              ? ' hover:bg-secondary hover:text-secondary-foreground hover:bg-opacity-20 focus:bg-secondary focus:text-secondary-foreground focus:bg-opacity-20'
              : ''

          const classNames = `${activeClassNames}${inactiveMobileClassNames}`

          return classNames
        })(),
      )}
      onClick={() => {
        if (isTidioExist) {
          openTidio()
          return
        }

        toast.promise(loadTidio(), {
          loading: 'Loading...',
          success: 'Chat loaded!',
          error: () => {
            if (isSafari)
              // eslint-disable-next-line react/no-unstable-nested-components -- its okay
              toast.custom((t) => <ContentBlockerToast t={t} />, { duration: Infinity, position: 'top-center' })

            return 'Failed to load chat.'
          },
        })
      }}
    >
      <p
        className={`flex items-center justify-start gap-2 font-medium ${
          !isSidebarOpen && !isMobile ? 'text-xl' : 'text-base'
        }`}
      >
        <MessageCircle />
        {isSidebarOpen || isMobile ? 'Chat with us' : ''}
      </p>
    </motion.button>
  )
}
