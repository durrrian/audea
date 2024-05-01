import { TriggerClient } from '@trigger.dev/sdk'

export const trigger = new TriggerClient({
  id: 'supercuan-saham-kXAa',
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
})
