export const pricingList = [
  {
    id: 'monthly' as const,
    name: 'Monthly subscription',
    price: 2,
    description: '(Probably) cheaper than your coffee.',
  },

  {
    id: 'yearly' as const,
    name: 'Yearly subscription',
    price: 20,
    description: 'Only pay for 10 months, get 2 months free.',
  },

  {
    id: 'lifetime' as const,
    name: 'Lifetime subscription',
    price: 40,
    description: 'Pay it once, use it forever.',
  },
]
