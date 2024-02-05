import { DetailedHTMLProps, HTMLAttributes } from 'react'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>

export const SubHeading = ({ children, ...props }: Props) => {
  return (
    <p
      className='from-landingPage-linierFooterTop to-landingPage-linierFooterBottom dark:from-landingPage-linierFooterTop dark:to-landingPage-linierFooterBottom max-w-[800px] bg-gradient-to-b bg-clip-text text-xl font-normal text-transparent'
      {...props}
    >
      {children}
    </p>
  )
}
