import { MidtransClient } from 'midtrans-node-client'

// Create Core API instance
export const midtrans = new MidtransClient.CoreApi({
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  isProduction: process.env.NODE_ENV === 'production',
})

export const midtransSnap = new MidtransClient.Snap({
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  isProduction: process.env.NODE_ENV === 'production',
})
