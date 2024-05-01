'use client'

import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from 'react-icons/io5'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '.'
import cn from '@repo/tailwind-config/cn'

type Props = {
  handleImageUpload: (image: File) => void
  placeholderName: string
  initialImageUrl?: string | null
}

export function ProfileUpload({ handleImageUpload, placeholderName, initialImageUrl }: Props) {
  const [open, setOpen] = useState(false)

  const [localImage, setLocalImage] = useState<File | null>(null)

  const memoizedPlaceholderName = useMemo(() => placeholderName, [placeholderName])

  const handleImage = (file: FileList | File[] | null) => {
    if (!file) {
      alert('Please upload a file')
      return
    }

    if (file.length > 1) {
      alert('Please select only one image')
      return
    }

    const selectedFile = file[0]

    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size should be 5MB or less.')
      return
    }

    setLocalImage(selectedFile)
    setOpen(false)
    handleImageUpload(selectedFile)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((file: File[]) => {
      handleImage(file)
    }, []),
  })

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className='w-fit h-fit p-0 m-0 bg-card-background hover:bg-card-background border-none flex flex-col gap-2'
        >
          <Avatar className='w-14 h-14'>
            {(() => {
              if (localImage !== null) {
                return <AvatarImage src={URL.createObjectURL(localImage)} />
              }

              if (initialImageUrl) {
                return <AvatarImage src={initialImageUrl} />
              }

              return (
                <AvatarFallback className='text-foreground'>
                  {memoizedPlaceholderName.length > 0 ? memoizedPlaceholderName[0] : ''}
                </AvatarFallback>
              )
            })()}
          </Avatar>

          <span className='text-blue-500'>{localImage || initialImageUrl ? 'Change' : 'Add'} photo</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=' mb-3'>Upload Profile Picture</DialogTitle>

          <div {...getRootProps()} className=' flex items-center justify-center w-full'>
            <label
              htmlFor='dropzone-file'
              className={cn(
                'relative flex flex-col items-center justify-center w-full py-6 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100',
                isDragActive ? 'border-yellow-300' : 'border-gray-300',
              )}
            >
              <div className=' text-center'>
                <div className=' border p-2 rounded-md max-w-min mx-auto'>
                  <IoCloudUploadOutline size='1.6em' />
                </div>

                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Drag an image</span>
                </p>
                <p className='text-xs text-gray-400 dark:text-gray-400'>
                  Click to upload &#40; image should be 500x500 px & under 10 MB &#41;
                </p>
              </div>
            </label>

            <Input
              id='dropzone-file'
              accept='image/png, image/jpeg'
              type='file'
              className='hidden'
              onChange={(e) => handleImage(e.target.files)}
              {...getInputProps()}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
