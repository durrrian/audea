'use client'

import { AspectRatio, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function DemoDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Watch Audea Demo</DialogTitle>
        </DialogHeader>

        <div className='w-full'>
          <AspectRatio ratio={16 / 9}>
            <iframe
              src='https://www.loom.com/embed/f8c9fbd00f24455897684a4b0c888a14?sid=22a16c03-ff27-4576-b1f9-e0a93038be2a?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true'
              allowFullScreen={true}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  )
}
