import { Fingerprint } from 'lucide-react'

export default function NoDataYet() {
  return (
    <div className='gap-2 flex flex-col items-center justify-center w-full h-fit'>
      <Fingerprint className='w-12 h-12' />

      <div className='grid gap-0'>
        <p>No data available yet...</p>

        <p>Please comeback later</p>
      </div>
    </div>
  )
}
