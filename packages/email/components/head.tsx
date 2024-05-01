import { Head as HeadReactEmail, Font } from '@react-email/components'

interface HeadProps {
  title?: string
}

export function Head({ title }: HeadProps) {
  return (
    <HeadReactEmail>
      <Font
        fontFamily='Work Sans'
        fallbackFontFamily='Helvetica'
        webFont={{
          url: 'https://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nXNigDp6_cOyA.ttf',
          format: 'truetype',
        }}
        fontWeight={400}
        fontStyle='normal'
      />

      <title>{title ?? 'Selamat Bergabung di Supercuan Saham!'}</title>
    </HeadReactEmail>
  )
}
