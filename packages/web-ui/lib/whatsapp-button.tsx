'use client'

import type { SourceFrom } from '@repo/api'
import { posthogCapture } from '@repo/api'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { WHATSAPP_NUMBER } from '@repo/helper'

export function WhatsappButton({ source_from }: { source_from: SourceFrom }) {
  return (
    <FloatingWhatsApp
      phoneNumber={WHATSAPP_NUMBER}
      accountName='Supercuan Saham'
      statusMessage='Dibalas dalam hitungan menit'
      chatMessage={`Halo!👋🏼 Langsung ketik message kamu dibawah dan kamu langsung di-redirect ke WhatsApp kami!`}
      placeholder='Tuliskan pesan kamu...'
      avatar={'https://utfs.io/f/780bbc6a-9e4c-41f3-a9f3-cbe7dbc1ee8d-1v7hjp.png'}
      buttonStyle={{ bottom: '3.5rem', right: '1rem', zIndex: 20 }}
      allowEsc={true}
      onSubmit={() => posthogCapture('whatsapp_button_clicked', { location: `whatsapp-fixed-button-${source_from}` })}
    />
  )
}
