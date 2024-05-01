'use client'

import { motion } from 'framer-motion'

export function NewText() {
  return (
    <motion.div className='grid place-items-start' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
      <h6 className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500'>NEW</h6>
    </motion.div>
  )
}
