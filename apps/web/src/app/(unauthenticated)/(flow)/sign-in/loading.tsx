import cn from '@repo/tailwind-config/cn'
import { Card, Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <Card className={cn('w-full h-fit min-h-[500px] mx-auto max-w-[400px] bg-supercuan-secondary mt-8')}>
      <Skeleton className='w-full h-full' />
    </Card>
  )
}
