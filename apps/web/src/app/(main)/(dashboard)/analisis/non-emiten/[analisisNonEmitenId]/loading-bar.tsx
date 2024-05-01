'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function LoadingBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className='w-full h-[10px] bg-supercuan-primary/10 rounded-full'>
      <motion.div
        className='w-full h-[10px] bg-supercuan-primary rounded-full'
        style={{ scaleX, transformOrigin: '0%' }}
      />
    </div>
  )
}
