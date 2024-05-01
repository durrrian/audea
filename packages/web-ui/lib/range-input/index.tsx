'use client'

import type { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { useState } from 'react'
import style from './index.module.css'

export interface IRangeInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'value' | 'onChange'> {
  handleChange: ChangeEventHandler<HTMLInputElement>
  initialValue?: number
}

export function RangeInput({ initialValue, handleChange, ...props }: IRangeInput) {
  const [rangeValue, setRangeValue] = useState(initialValue ?? 0)

  return (
    <input
      type='range'
      value={rangeValue}
      className={`${style.slider} relative`}
      onChange={(e) => {
        setRangeValue(Number(e.target.value))
        handleChange(e)
      }}
      {...props}
    />
  )
}
