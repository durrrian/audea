import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { type NextRequest } from 'next/server'
import { Webhook } from 'svix'

export async function clerkEvent(request: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers7
    const svixId = request.headers.get('svix-id')
    const svixTimestamp = request.headers.get('svix-timestamp')
    const svixSignature = request.headers.get('svix-signature')

    // If there are no headers, error out
    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new Error('Error occured -- no svix headers')
    }

    // Get the body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- payload json is always as any
    const payload: Record<string, any> = await request.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    const evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent

    return evt
  } catch (error) {
    console.error(error)
    throw error
  }
}
