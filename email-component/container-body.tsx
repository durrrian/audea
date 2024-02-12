import { Container } from '@react-email/components'

interface Props {
  children: React.ReactNode
}

export function ContainerBody({ children }: Props) {
  return <Container className='bg-background mt-0 mb-[64px] mx-auto p-[20px] w-full'>{children}</Container>
}
