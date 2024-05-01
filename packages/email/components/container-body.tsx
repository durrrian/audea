import { Container } from '@react-email/components'

interface ContainerBodyProps {
  children: React.ReactNode
}

export function ContainerBody({ children }: ContainerBodyProps) {
  return <Container className='bg-background mt-0 mb-[64px] mx-auto p-[20px] w-full'>{children}</Container>
}
