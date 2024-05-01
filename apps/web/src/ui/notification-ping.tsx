export function NotificationPing() {
  return (
    <span className='absolute right-0 top-0 flex h-4 w-4'>
      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75' />
      <span className='relative inline-flex rounded-full h-4 w-4 bg-red-500' />
    </span>
  )
}
