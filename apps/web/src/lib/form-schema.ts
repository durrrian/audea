import { z } from 'zod'

export const ZName = z.string().min(1, { message: 'Nama tidak boleh kosong' })

export const ZPhoneNumber = z
  .string()
  .min(9, { message: 'Nomor telepon tidak valid' })
  .max(13, { message: 'Nomor telepon tidak valid' })
  .refine((value) => /^(?<temp1>8\d{8,11}|08\d{8,11})$/.test(value), { message: 'Nomor telepon tidak valid' })

export const ZEmail = z
  .string()
  .email({ message: 'Format harus dalam berbentuk email' })
  .min(1, { message: 'Email tidak boleh kosong' })

export const ZOtp = z
  .string()
  .min(6, { message: 'OTP harus 6 karakter' })
  .max(6)
  .refine((value) => /^[0-9]+$/.test(value), {
    message: 'OTP must only contain numbers',
  })
