import { Text as TextReactEmail } from '@react-email/components'

interface TextProps
  extends Omit<
    Readonly<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, 'ref'>>,
    'style'
  > {
  children: React.ReactNode
}

export function Text({ children, ...props }: TextProps) {
  return (
    <TextReactEmail
      style={{
        fontSize: '16px',
        lineHeight: '24px',
        textAlign: 'left',
      }}
      {...props}
    >
      {children}
    </TextReactEmail>
  )
}
