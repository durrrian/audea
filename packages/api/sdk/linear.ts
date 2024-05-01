import { LinearClient } from '@linear/sdk'

export const linear = new LinearClient({
  apiKey: process.env.NEXT_PUBLIC_LINEAR_TOKEN,
})

export const teamId = '4e6fe746-55c1-4467-a47e-5ffafcdf0b30'

export const errorLabelId = '5ad08a5c-d969-41a8-a53d-b0a2ca585452'
