interface UnauthenticatedLayoutProps {
  children: React.ReactNode
}

export default function UnauthenticatedLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <div className='min-h-screen w-full bg-supercuan-secondary bg-dot-black/[0.2] py-12 px-2'>
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className='absolute pointer-events-none inset-0 flex items-center justify-center bg-supercuan-secondary [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' /> */}

      <main className='w-full'>{children}</main>
    </div>
  )
}
