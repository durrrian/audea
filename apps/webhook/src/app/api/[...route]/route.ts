import { type NextRequest } from 'next/server'
import { clerkEvent } from '~/lib/clerk-event'
import { userCreated, userDeleted, userUpdated } from '~/model/clerk'
import { midtrans } from '~/model/midtrans'

export async function POST(request: NextRequest, { params }: { params: { route: string[] } }) {
  try {
    const route = params.route[0]

    if (route === 'clerk') {
      const { type, data } = await clerkEvent(request)

      if (type === 'user.created') {
        const response = await userCreated(data)
        return Response.json(response)
      }

      if (type === 'user.updated') {
        const response = await userUpdated(data)
        return Response.json(response)
      }

      if (type === 'user.deleted') {
        const response = await userDeleted(data)
        return Response.json(response)
      }

      return Response.json({ message: 'Invalid event type' }, { status: 404 })
    }

    if (route === 'midtrans') {
      //   return Response.json({ route: params.route })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- its okay
      const payload: Record<string, any> = await request.json()
      await midtrans(payload)

      return Response.json({ success: 'Background function is running!' }, { status: 200 })
    }

    return Response.json({ message: 'Route does not exist' }, { status: 404 })
  } catch (error) {
    console.error(error)
    return Response.json({ message: 'Error when running the api route' }, { status: 500 })
  }
}
