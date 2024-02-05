'use client'

import Image from 'next/image'
import { HTMLMotionProps, motion } from 'framer-motion'

export default function RecordingButton({
  ...props
}: Omit<HTMLMotionProps<'button'>, 'initial' | 'animate' | 'whileHover'>) {
  return (
    <motion.button
      className='rounded-full w-fit h-fit overflow-hidden flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      {...props}
    >
      <Image
        src='/recording-button.png'
        alt={'Recording button'}
        quality={100}
        draggable={false}
        priority={true}
        width={180}
        height={180}
      />
    </motion.button>
  )
}
