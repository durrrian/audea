export function parseUrlMidtransApp(endpoint: string) {
  const host = process.env.NODE_ENV === 'production' ? 'https://app.midtrans.com' : 'https://app.sandbox.midtrans.com'
  return new URL(endpoint, host)
}

export function parseUrlMidtransApi(endpoint: string) {
  const host = process.env.NODE_ENV === 'production' ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com'
  return new URL(endpoint, host)
}
