import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@repo/web-ui/components'

export interface TextDisplayProps {
  title: string
  subtitle: string
  withSelect?: boolean
  selectOnValueChange?: (value: string) => void
  selectDefaultValue?: string
  selectItems?: {
    value: string
    name: string
  }[]
  children?: React.ReactNode
}

export default function TextDisplay({
  title,
  subtitle,
  withSelect = false,
  selectOnValueChange,
  selectDefaultValue,
  selectItems,
  children,
}: TextDisplayProps) {
  return (
    <div className='border-border flex h-full w-full flex-col justify-around gap-10 rounded-xl border p-4 shadow-md'>
      <header className='grid gap-0 md:gap-2'>
        {(() => {
          if (withSelect && selectItems) {
            return (
              <div className='flex items-center justify-start gap-2'>
                <h6 className='text-lg font-semibold md:text-2xl'>{title}</h6>

                <Select onValueChange={selectOnValueChange} defaultValue={selectDefaultValue}>
                  <SelectTrigger className='w-fit font-semibold'>
                    <SelectValue defaultValue={selectDefaultValue} />
                  </SelectTrigger>
                  <SelectContent className='font-semibold'>
                    {selectItems.map((v) => {
                      return (
                        <SelectItem value={v.value} key={v.value}>
                          {v.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            )
          }

          return <h6 className='text-lg font-semibold md:text-2xl'>{title}</h6>
        })()}

        <p className='text-sm md:text-base'>{subtitle}</p>
      </header>

      <div className='flex h-full w-full items-center justify-center'>{children}</div>
    </div>
  )
}
