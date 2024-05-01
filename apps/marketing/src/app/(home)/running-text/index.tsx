'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import style from './index.module.css'

export function RunningText() {
  const text =
    'Supercuan Saham merupakan value investing platform yang berfokus untuk “beat the market”. Member akan mendapatkan akses ke porto saham saya yang bisa diikuti beserta artikel dan video pembelajaran saham.'

  const arrayOfWords = text.split(' ')

  const [arrayOfVisibleWords, setArrayOfVisibleWords] = useState(
    Array.from({ length: arrayOfWords.length }, () => false),
  )

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end'] })

  useEffect(() => {
    const func = scrollYProgress.on('change', (latest) => {
      const newVal = latest * arrayOfWords.length

      const index = Math.ceil(newVal)

      const newArr = Array.from({ length: arrayOfWords.length }, (_, i) => i < index)

      setArrayOfVisibleWords(newArr)
    })

    return () => {
      func()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need
  }, [scrollYProgress])

  return (
    <div className='max-w-full scroll-smooth select-none' ref={ref}>
      <div className={style['background-section-2']}>
        <div className='sticky left-0 top-[-15vh] flex items-center h-1/2 min-h-1/2 max-h-1/2 w-full min-w-full max-w-full overflow-hidden scroll-smooth'>
          <section className='relative w-full md:mx-20 mx-4'>
            <p className={style.arrayOfWords}>
              {arrayOfWords.map((v) => {
                return <span key={v}>{v} </span>
              })}
            </p>

            <h3 className={`${style.arrayOfWords} text-supercuan-whitePrimary`}>
              {arrayOfWords.map((v, i) => {
                return (
                  <motion.span key={v} initial={{ opacity: 0 }} animate={{ opacity: arrayOfVisibleWords[i] ? 1 : 0 }}>
                    {v}{' '}
                  </motion.span>
                )
              })}
            </h3>
          </section>
        </div>
      </div>
    </div>
  )
}
