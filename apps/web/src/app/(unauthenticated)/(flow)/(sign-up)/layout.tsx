import { testimonialData } from '@repo/web-ui/lib'
import { RegisterFlowContainer } from '~/ui/register-flow-container'
import { SnapJS } from '~/lib/snap-js'

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SnapJS />

      <div className='w-full flex items-center justify-center'>
        <RegisterFlowContainer testimonial={testimonialData} carousel className='mt-8'>
          {children}
        </RegisterFlowContainer>
      </div>
    </>
  )
}
