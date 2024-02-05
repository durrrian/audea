import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading = ({ as, children, ...props }: Props) => {
  const classStr =
    'font-medium md:text-4xl text-3xl text-transparent bg-clip-text bg-gradient-to-b from-landingPage-linierTitleTop to-landingPage-linierTitleBottom dark:from-landingPage-linierTitleTop dark:to-landingPage-linierTitleBottom max-w-[550px] mx-auto'

  if (as === 'h1') {
    return (
      <h1 className={classStr} {...props}>
        {children}
      </h1>
    )
  }

  if (as === 'h2') {
    return (
      <h2 className={classStr} {...props}>
        {children}
      </h2>
    )
  }

  if (as === 'h3') {
    return (
      <h3 className={classStr} {...props}>
        {children}
      </h3>
    )
  }

  if (as === 'h4') {
    return (
      <h4 className={classStr} {...props}>
        {children}
      </h4>
    )
  }

  if (as === 'h5') {
    return (
      <h5 className={classStr} {...props}>
        {children}
      </h5>
    )
  }

  return (
    <h6 className={classStr} {...props}>
      {children}
    </h6>
  )
}
