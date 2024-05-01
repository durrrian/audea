'use client'

import { Button, Skeleton } from '../components'
import { useState } from 'react'
import { Bug, Check, Copy, ExternalLink, LogOut, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { errorLabelId, linear, teamId } from '@repo/api'
import { useQuery } from '@tanstack/react-query'

export type NextJSErrorType = Error & { digest?: string }

const uploadToLinear = async (error: NextJSErrorType) => {
  const title = `Error: ${error.name}`
  const description = `URL:\n${window.location.href}\nMessage:\n${error.message}\nCause:\n${error.cause}\nDigest:\n${error.digest}\nStack:\n\`\`\`${error.stack}`

  await linear.createIssue({ teamId, title, description, labelIds: [errorLabelId] })
}

export function NextJSError({ error, reset }: { error: NextJSErrorType; reset: () => void }) {
  const [successCopy, setSuccessCopy] = useState(false)

  const { signOut, loaded, user } = useClerk()

  const router = useRouter()

  const { isPending } = useQuery({
    queryKey: ['error-to-linear', error.name, error.message, error.digest],
    queryFn: async () => {
      console.error(error)
      await uploadToLinear(error)
      return null
    },
  })

  return (
    <section className='h-full min-h-[100dvh] w-full flex items-center justify-center select-none'>
      <section className='w-full h-fit relative max-w-[400px] mt-[-4rem] px-2'>
        <div className='bg-supercuan-primary text-supercuan-secondary rounded-full w-fit h-fit p-2 absolute top-0 left-0 bottom-0 right-0 mx-auto shadow-md'>
          <Bug className='w-8 h-8' />
        </div>

        <section className='bg-white shadow-xl rounded-xl pt-10 mt-6 px-4 pb-4 flex flex-col items-center justify-center text-center gap-6'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <h1 className='text-lg font-semibold'>Maaf, ada yang error</h1>

            <p>
              Ini seharusnya tidak terjadi. Kita {isPending ? 'lagi laporin' : 'udah laporin'} ke tim dev Supercuan
              Saham atas hal ini.
            </p>

            <Button
              className='bg-supercuan-primary w-full rounded-3xl text-supercuan-secondary hover:bg-supercuan-primary/90 hover:text-supercuan-secondary'
              onClick={() => reset()}
            >
              <RefreshCcw className='w-4 h-4 mr-2' />
              Reload Supercuan Saham
            </Button>
          </div>

          <div className='flex flex-col items-center justify-center gap-2'>
            <p>
              <strong className='font-medium'>Apakah error ini sering terjadi?</strong> Bisa jadi kita lagi ada gangguan
              server. Coba cek status server kita yaa.
            </p>

            <Button
              className='bg-supercuan-primary w-full rounded-3xl text-supercuan-secondary hover:bg-supercuan-primary/90 hover:text-supercuan-secondary'
              asChild
            >
              <Link href='https://status.supercuansaham.id' target='_blank'>
                Supercuan Saham Status <ExternalLink className='ml-2 w-4 h-4' />{' '}
              </Link>
            </Button>
          </div>
        </section>

        <section className='mt-4 flex items-center justify-center gap-4'>
          <Button
            className='text-xs px-3 py-0.5 rounded-2xl'
            variant='outline'
            onClick={async () => {
              await navigator.clipboard.writeText(JSON.stringify(error, null, 2))
              setSuccessCopy(true)

              setTimeout(() => {
                setSuccessCopy(false)
              }, 3000)
            }}
          >
            {successCopy ? <Check className='w-3 h-3 mr-2' /> : <Copy className='w-3 h-3 mr-2' />}
            Copy error details
          </Button>

          {(() => {
            if (!loaded) return <Skeleton className='w-[94.45px] h-[40px] rounded-2xl' />

            if (user)
              return (
                <Button
                  className='text-xs px-3 py-0.5 rounded-2xl'
                  variant='outline'
                  onClick={async () => {
                    await signOut()
                    router.push('/')
                  }}
                >
                  <LogOut className='w-3 h-3 mr-2' /> Sign out
                </Button>
              )

            return <></>
          })()}
        </section>
      </section>
    </section>
  )
}
