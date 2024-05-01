'use client'

import { Fireworks as FireworksComponent } from '@fireworks-js/react'

export function Fireworks() {
  return (
    <FireworksComponent
      options={{
        rocketsPoint: {
          min: 0,
          max: 100,
        },
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: '0',
        opacity: '100%',
      }}
    />
  )
}
