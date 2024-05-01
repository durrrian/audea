import { Text } from '@react-email/components'

interface FooterTextProps {
  email: string
}

export function FooterText({ email }: FooterTextProps) {
  return (
    <Text
      style={{
        color: '#8898aa',
        fontSize: '12px',
        lineHeight: '16px',
      }}
    >
      Email ini adalah email dari Supercuan Saham yang dikirim ke {email}. Harap hati-hati atas penipuan yang mengatas
      namakan pihak Supercuan Saham.
    </Text>
  )
}
