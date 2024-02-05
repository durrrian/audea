/**
 * This MDX components is used to render only files in here that ends
 * with .mdx extension.
 *
 * Examples would be the privacy policy and terms of service page.
 */

import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    title: ({ children }) => <title>{children}</title>,
    h1: ({ children }) => <h1 className='text-4xl font-bold'>{children}</h1>,
    h2: ({ children }) => <h2 className='pb-1 pt-4 text-3xl font-semibold'>{children}</h2>,
    h3: ({ children }) => <h3 className='pb-1 pt-2 text-2xl font-semibold'>{children}</h3>,
    ul: ({ children }) => <ul className='ml-5 list-outside'>{children}</ul>,
    ol: ({ children }) => <ol className='ml-5 list-outside'>{children}</ol>,
    li: ({ children }) => <li className='list-decimal'>{children}</li>,
    p: ({ children }) => <p className='text-justify'>{children}</p>,
    a: ({ children }) => <a className='text-primary cursor-pointer underline'>{children}</a>,
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
