/* eslint-disable @typescript-eslint/no-unsafe-member-access --  its okay */

'use client'

import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@repo/prisma/client'
import cn from '@repo/tailwind-config/cn'
import {
  ProfileUpload,
  toast,
  Form,
  Button,
  Label,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@repo/web-ui/components'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ZName, ZPhoneNumber } from '~/lib/form-schema'
import { updateProfile } from './update-profile'

interface ProfileProps {
  className?: string
  user: User
}

const FormSchema = z.object({
  name: ZName,
  whatsapp: ZPhoneNumber.optional(),
  image: z.instanceof(File).optional(),
})

export function Profile({ className, user }: ProfileProps) {
  const router = useRouter()

  const { isLoaded, user: clerkUser, isSignedIn } = useUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    values: {
      name: user.name,
      whatsapp: user.whatsappNumber ? user.whatsappNumber.split('+62')[1] : '',
    },
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
  })

  if (!isLoaded) return null

  if (!isSignedIn) {
    router.push('/sign-in')
    return
  }

  const isSubmitting = form.formState.isSubmitting

  const onFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      let photoUrl: string | null = null

      if (data.image) {
        const setProfileImage = await clerkUser.setProfileImage({ file: data.image })

        photoUrl = setProfileImage.publicUrl
      }

      const nameArr = data.name.split(' ')

      const firstName = nameArr[0]

      const lastName = nameArr.length > 1 ? nameArr.slice(1).join(' ') : undefined

      await clerkUser.update({ firstName, lastName })

      const dbData = { name: data.name, whatsappNumber: data.whatsapp ? `+62${data.whatsapp}` : null, photoUrl }

      await updateProfile(user.id, dbData)

      toast.success('Profile updated successfully', { duration: 3000 })

      router.refresh()
    } catch (error) {
      console.error(error)

      const isClerkError = 'errors' in error && Array.isArray(error.errors)

      if (!isClerkError) {
        form.setError('root', { message: 'An error occured' })
        return
      }

      form.setError('root', { message: error.errors[0].longMessage })

      toast.error('An error occured', { duration: 3000 })
    }
  }

  return (
    <Form {...form}>
      <form className={cn('flex w-full flex-col gap-y-4', className)} onSubmit={form.handleSubmit(onFormSubmit)}>
        <fieldset className='flex w-full flex-col gap-y-4' disabled={isSubmitting}>
          <div className='w-full flex items-center justify-center my-4'>
            <ProfileUpload
              handleImageUpload={(file) => {
                form.setValue('image', file)
              }}
              placeholderName={form.getValues('name')}
              initialImageUrl={user.photoUrl}
            />
          </div>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Label htmlFor='email' className='text-muted-foreground'>
              Email
            </Label>
            <Input id='email' type='email' className='bg-muted mt-2' value={user.email} disabled />
          </div>

          <FormField
            control={form.control}
            name='whatsapp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. WhatsApp</FormLabel>
                <FormControl>
                  <div className='border-input ring-offset-background focus-within:ring-ring flex items-center justify-center overflow-hidden rounded-md border focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'>
                    <p className='flex h-10 items-center justify-center bg-gray-200 px-3 py-2 text-black text-sm'>
                      +62
                    </p>

                    <input
                      type='text'
                      className={cn(
                        'bg-background placeholder:text-muted-foreground flex h-10 w-full px-3 py-2 text-sm outline-none ring-0 focus:ring-0',
                      )}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Kami hanya menghubungi kamu via WhatsApp apabila ada terjadi keanehan terkait akun kamu!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button type='submit' loading={isSubmitting} className='self-end' disabled={isSubmitting}>
          {isSubmitting ? 'Updating profile...' : 'Update profile'}
        </Button>

        {form.formState.errors.root ? (
          <p className='text-sm font-medium text-destructive'>{form.formState.errors.root.message}</p>
        ) : null}
      </form>
    </Form>
  )
}
