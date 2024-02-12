import { Button as ButtonReactEmail } from '@react-email/components'

export function Button({
  children,
  ...props
}: Omit<
  Readonly<Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'ref'>>,
  'style'
>) {
  return (
    <ButtonReactEmail
      style={{
        backgroundColor: '#1F365F',
        borderRadius: '5px',
        color: '#FEFFF7',
        fontSize: '16px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
        display: 'block',
        width: '100%',
      }}
      {...props}
    >
      {children}
    </ButtonReactEmail>
  )
}
