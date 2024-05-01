import { LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

export const QuestionMark: LucideIcon = forwardRef(({ size = 111, className }, ref) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={Number(size) * (86 / 111)} // maintain aspect ratio
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect
        x='52.236'
        y='14.956'
        width='52'
        height='52'
        rx='14'
        transform='rotate(6 52.236 14.956)'
        strokeWidth='4'
        className='stroke-gray-100 dark:stroke-gray-700'
      />
      <rect
        x='1.78'
        y='-2.198'
        width='52'
        height='52'
        rx='14'
        transform='scale(-1 1) rotate(6 -211.11 -567.866)'
        strokeWidth='4'
        className='stroke-gray-100 dark:stroke-gray-700'
      />
      <g>
        <path
          className='fill-gray-50 dark:fill-[#262626]'
          d='M52.01 36.25c.703-6.684 1.055-10.026 2.624-12.442a12 12 0 0 1 5.763-4.668c2.69-1.032 6.032-.68 12.716.022l9.547 1.003c6.684.703 10.026 1.054 12.442 2.623a12 12 0 0 1 4.667 5.764c1.033 2.69.681 6.031-.021 12.715l-1.004 9.547c-.702 6.684-1.053 10.026-2.622 12.442a12 12 0 0 1-5.764 4.667c-2.69 1.033-6.032.682-12.715-.02l-9.548-1.004c-6.684-.703-10.025-1.054-12.442-2.623a12 12 0 0 1-4.667-5.764c-1.032-2.69-.681-6.031.021-12.715l1.004-9.547Z'
        />
        <path
          className='fill-gray-50 dark:fill-[#262626]'
          d='M58.743 38.25c-.702-6.684-1.053-10.026-2.622-12.442a12 12 0 0 0-5.764-4.668c-2.69-1.032-6.031-.68-12.715.022l-9.548 1.003c-6.683.703-10.025 1.054-12.442 2.623a12 12 0 0 0-4.667 5.764c-1.032 2.69-.681 6.031.022 12.715l1.003 9.547c.703 6.684 1.054 10.026 2.623 12.442a12 12 0 0 0 5.763 4.667c2.69 1.033 6.032.682 12.716-.02l9.547-1.004c6.684-.703 10.026-1.054 12.442-2.623a12 12 0 0 0 4.667-5.764c1.033-2.69.681-6.031-.021-12.715l-1.004-9.547Z'
        />
        <path
          className='fill-gray-100 dark:fill-[#262626]'
          d='M23.08 45.387c-.781-11.173-1.172-16.76.704-21.18a20 20 0 0 1 8.11-9.329c4.115-2.473 9.702-2.864 20.876-3.645 11.174-.781 16.76-1.172 21.18.704a20 20 0 0 1 9.33 8.11c2.472 4.115 2.863 9.702 3.644 20.876.782 11.174 1.172 16.76-.704 21.18a20 20 0 0 1-8.11 9.33c-4.115 2.472-9.702 2.863-20.876 3.644-11.173.781-16.76 1.172-21.18-.704a20 20 0 0 1-9.329-8.11c-2.473-4.115-2.864-9.702-3.645-20.876Z'
        />
        <path
          d='M79.14 73.146a22.001 22.001 0 0 0 3.636-2.732c.974.077 1.862.13 2.676.149 2.131.05 3.933-.124 5.623-.772a14 14 0 0 0 6.724-5.446c.986-1.517 1.53-3.244 1.924-5.34.387-2.053.658-4.626 1.001-7.893l.01-.089 1.003-9.547.009-.088c.344-3.267.614-5.841.663-7.93.049-2.131-.124-3.934-.773-5.623a13.996 13.996 0 0 0-5.445-6.725c-1.517-.985-3.244-1.53-5.34-1.924-1.7-.32-3.757-.56-6.27-.83a22 22 0 0 0-9.849-8.26c-2.55-1.082-5.346-1.467-8.816-1.507-3.427-.04-7.685.257-13.194.642l-.092.007-.09.006c-5.51.386-9.768.683-13.157 1.2-3.43.523-6.145 1.293-8.52 2.72a21.999 21.999 0 0 0-7.517 7.511c-1.289.157-2.43.32-3.443.511-2.095.395-3.822.939-5.34 1.924a14 14 0 0 0-5.445 6.725c-.648 1.69-.822 3.492-.772 5.623.048 2.089.319 4.663.662 7.93l.01.088 1.003 9.547.01.089c.343 3.267.613 5.84 1 7.894.395 2.095.939 3.822 1.924 5.34a14 14 0 0 0 6.725 5.445c1.69.648 3.491.821 5.623.772 1.129-.026 2.4-.118 3.846-.25a21.998 21.998 0 0 0 6.123 3.901c2.55 1.082 5.346 1.467 8.816 1.507 3.428.04 7.685-.257 13.194-.642l.092-.007.09-.006c5.51-.385 9.768-.683 13.157-1.2 3.43-.523 6.145-1.293 8.52-2.72Z'
          strokeWidth='4'
        />
      </g>
      <rect
        className='fill-gray-50 stroke-gray-200 dark:fill-[#262626] dark:stroke-[#404040]'
        x='18.713'
        y='11.609'
        width='68'
        height='68'
        rx='22'
        transform='rotate(-4 18.713 11.61)'
        strokeWidth='4'
      />
      <path
        className='origin-center animate-floatSlowSm fill-gray-600 dark:fill-gray-200'
        d='M54.355 50.488c2.159-.15 3.533-1.184 4.199-3.16.577-1.7 1.134-2.543 4.717-4.936 3.914-2.63 5.462-5.39 5.192-9.256-.468-6.69-6.26-10.598-14.789-10.001-6.317.441-10.793 3.085-12.406 6.438a6.423 6.423 0 0 0-.653 3.314c.162 2.694 2.153 4.35 5.031 4.148 2.053-.143 3.797-1.256 4.553-3.077.69-1.629 1.81-2.457 3.49-2.574 1.946-.137 3.5 1.04 3.622 2.773.153 2.186-.66 3.207-4.292 5.657-2.559 1.706-3.98 3.6-3.792 6.292.198 2.825 2.276 4.582 5.128 4.382Zm1.043 12.624c3.119-.218 5.514-2.743 5.305-5.728-.207-2.959-2.93-5.126-6.048-4.908-3.119.218-5.487 2.741-5.28 5.7.209 2.985 2.905 5.154 6.023 4.936Z'
      />
      <defs>
        <linearGradient id='b' x1='6' y1='7.5' x2='55.377' y2='75.725' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#313131' />
          <stop offset='1' stopColor='#313131' stopOpacity='0' />
        </linearGradient>
        <filter
          id='a'
          x='.338'
          y='.585'
          width='110.078'
          height='85.14'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
          <feOffset />
          <feGaussianBlur stdDeviation='3' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' />
          <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_224_2' />
          <feBlend in='SourceGraphic' in2='effect1_dropShadow_224_2' result='shape' />
        </filter>
      </defs>
    </svg>
  )
})

QuestionMark.displayName = 'QuestionMark'
