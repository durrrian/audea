import { Body as BodyReactEmail } from '@react-email/components'

interface BodyProps {
  children: React.ReactNode
}

export function Body({ children }: BodyProps) {
  return (
    <BodyReactEmail
      style={{
        backgroundColor: '#FEFFF7',
        fontFamily: '"Work Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
        color: '#1F365F',
      }}
    >
      {children}
    </BodyReactEmail>
  )
}
