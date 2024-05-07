import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import Image from 'next/image'

export const MDXComponents: MDXRemoteProps['components'] = {
  h1: (props) => (
    <h1 {...props} className='text-3xl font-semibold mb-4 mt-8 text-left' suppressHydrationWarning>
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2 {...props} className='text-2xl font-medium mb-4 mt-8 text-left' suppressHydrationWarning>
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} className='text-xl font-normal mb-4 mt-8 text-left' suppressHydrationWarning>
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4 {...props} className='text-lg font-normal mb-4 mt-8 text-left' suppressHydrationWarning>
      {props.children}
    </h4>
  ),
  h5: (props) => (
    <h5 {...props} className='text-lg font-normal mb-4 mt-8 text-left' suppressHydrationWarning>
      {props.children}
    </h5>
  ),
  h6: (props) => (
    <h6 {...props} className='text-lg font-normal mb-4 mt-8 text-left' suppressHydrationWarning>
      {props.children}
    </h6>
  ),
  blockquote: (props) => (
    <blockquote className='p-4 my-8 border-l-4 border-gray-300 bg-gray-50' {...props} suppressHydrationWarning>
      {props.children}
    </blockquote>
  ),
  img: (props) => (
    <figure className='max-w-lg mx-auto my-8' suppressHydrationWarning>
      <img className='h-auto max-w-full rounded-lg mx-auto' {...props} suppressHydrationWarning />
      <figcaption className='mt-2 text-sm text-center text-gray-500' suppressHydrationWarning>
        {props.alt}
      </figcaption>
    </figure>
  ),
  ul: (props) => (
    <ul {...props} className='space-y-1 list-disc list-inside my-4' suppressHydrationWarning>
      {props.children}
    </ul>
  ),
  ol: (props) => (
    <ol className='space-y-1 list-decimal list-inside my-4' {...props} suppressHydrationWarning>
      {props.children}
    </ol>
  ),
  p: (props) => (
    <p className='my-4 text-justify' {...props} suppressHydrationWarning>
      {props.children}
    </p>
  ),
  hr: (props) => (
    <hr
      {...props}
      className='my-12 w-48 h-1 mx-auto bg-supercuan-primary border-0 rounded-full md:my-10'
      suppressHydrationWarning
    />
  ),
  code: (props) => (
    <code className='px-2 py-1 rounded-md bg-yellow-300 font-sans text-base' {...props} suppressHydrationWarning>
      {props.children}
    </code>
  ),
  a: (props) => (
    <a {...props} className='underline text-blue-700 cursor-pointer' target='_blank' suppressHydrationWarning>
      {props.children}
    </a>
  ),
}




export function MDXMain(components: MDXComponentsType): MDXComponentsType {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    title: ({ children }) => <title>{children}</title>,
    h1: ({ children }) => <h1 className='text-6xl font-bold'>{children}</h1>,
    h2: ({ children }) => <h2 className='text-3xl font-semibold pt-4 pb-1'>{children}</h2>,
    h3: ({ children }) => <h3 className='text-2xl font-semibold pt-2 pb-1'>{children}</h3>,
    ul: ({ children }) => <ul className='list-outside ml-5'>{children}</ul>,
    ol: ({ children }) => <ol className='list-outside ml-5'>{children}</ol>,
    li: ({ children }) => <li className='list-decimal'>{children}</li>,
    p: ({ children }) => <p className='text-justify'>{children}</p>,
    a: ({ children }) => <a className='underline text-primary cursor-pointer'>{children}</a>,
    img: (props) => (
      <Image
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
        // @ts-ignore
        width={1100}
        // @ts-ignore
        height={618.75}
        quality={100}
        draggable={false}
        alt=''
        {...props}
      />
    ),
    ...components,
  }
}
