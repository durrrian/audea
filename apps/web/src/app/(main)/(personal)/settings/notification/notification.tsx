'use client'

import type { EmailNotification } from '@repo/prisma/client'
import cn from '@repo/tailwind-config/cn'
import {
  Button,
  Switch,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  toast,
} from '@repo/web-ui/components'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { optionitem } from './option-item'
import { updateNotification } from './update-notification'

interface NotificationProps {
  notification: EmailNotification
}

const FormSchema = z.object({
  monthlyRecap: z.boolean(),
  weeklyRecap: z.boolean(),
  buySell: z.boolean(),
  newDivident: z.boolean(),
  newAnalisis: z.boolean(),
  newCourse: z.boolean(),
})

export function Notification({ notification }: NotificationProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      monthlyRecap: notification.monthlyRecap,
      weeklyRecap: notification.weeklyRecap,
      buySell: notification.buySell,
      newDivident: notification.newDivident,
      newAnalisis: notification.newAnalisis,
      newCourse: notification.newCourse,
    },
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
  })

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await updateNotification(data)

      toast.success('Preferensi berhasil disimpan')

      location.reload()
    } catch (error) {
      console.error(error)
      toast.error('Gagal menyimpan preferensi')
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-8' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='space-y-4'>
          {optionitem.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={item.id}
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>{item.title}</FormLabel>
                    <FormDescription>{item.description}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <FormLabel className='text-base'>Pemberitahuan berakhirnya membership</FormLabel>
              <FormDescription> Email pemberitahuan akan dikirim H-7 sebelum tanggal membership habis.</FormDescription>
            </div>
            <FormControl>
              <Switch
                checked
                className={cn('data-[state=checked]:bg-supercuan-primary cursor-not-allowed opacity-50')}
              />
            </FormControl>
          </div>
        </div>

        <Button
          variant='default'
          type='submit'
          className={cn('w-full text-lg disabled:cursor-not-allowed')}
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Simpan preferensi
        </Button>
      </form>
    </Form>
  )
}
