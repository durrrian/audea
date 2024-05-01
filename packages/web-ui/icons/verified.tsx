import { LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

export const VerifiedIcon: LucideIcon = forwardRef(({ size = 24, color = 'currentColor', ...props }, ref) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='badge, verified, award'>
        <path
          id='Icon'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.5457 2.89094C11.5779 1.70302 13.4223 1.70302 14.4545 2.89094L15.2585 3.81628C15.3917 3.96967 15.5947 4.04354 15.7954 4.0117L17.0061 3.81965C18.5603 3.57309 19.9732 4.75869 20.0003 6.33214L20.0214 7.55778C20.0249 7.76096 20.1329 7.94799 20.3071 8.05261L21.358 8.6837C22.7071 9.49389 23.0274 11.3103 22.0368 12.5331L21.2651 13.4855C21.1372 13.6434 21.0997 13.8561 21.1659 14.0482L21.5652 15.2072C22.0779 16.695 21.1557 18.2923 19.6109 18.5922L18.4075 18.8258C18.208 18.8646 18.0426 19.0034 17.9698 19.1931L17.5308 20.3376C16.9672 21.8069 15.234 22.4378 13.8578 21.6745L12.7858 21.08C12.6081 20.9814 12.3921 20.9814 12.2144 21.08L11.1424 21.6745C9.76623 22.4378 8.033 21.8069 7.4694 20.3376L7.03038 19.1931C6.9576 19.0034 6.79216 18.8646 6.59268 18.8258L5.38932 18.5922C3.84448 18.2923 2.92224 16.695 3.43495 15.2072L3.83431 14.0482C3.90052 13.8561 3.86302 13.6434 3.7351 13.4855L2.96343 12.5331C1.97279 11.3103 2.29307 9.49389 3.64218 8.6837L4.69306 8.05261C4.86728 7.94799 4.97526 7.76096 4.97875 7.55778L4.99985 6.33214C5.02694 4.75869 6.43987 3.57309 7.99413 3.81965L9.20481 4.0117C9.40551 4.04354 9.60845 3.96967 9.74173 3.81628L10.5457 2.89094ZM15.7072 11.2071C16.0977 10.8166 16.0977 10.1834 15.7072 9.79289C15.3167 9.40237 14.6835 9.40237 14.293 9.79289L11.5001 12.5858L10.7072 11.7929C10.3167 11.4024 9.68351 11.4024 9.29298 11.7929C8.90246 12.1834 8.90246 12.8166 9.29298 13.2071L10.4394 14.3536C11.0252 14.9393 11.975 14.9393 12.5608 14.3536L15.7072 11.2071Z'
          fill={color}
        />
      </g>
    </svg>
  )
})

VerifiedIcon.displayName = 'VerifiedIcon'
