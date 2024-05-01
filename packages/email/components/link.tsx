import { Link as LinkReactEmail } from '@react-email/components'

export function Link({
  children,
  ...props
}: Omit<
  Readonly<Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'ref'>>,
  'style'
>) {
  return (
    <LinkReactEmail
      style={{
        color: '#556cd6',
        textDecoration: 'underline',
      }}
      {...props}
    >
      {children}
    </LinkReactEmail>
  )
}
