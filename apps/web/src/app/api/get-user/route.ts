import { prisma } from '@repo/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestBody = await request.json()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- according to api is okay
  const clerkUserId: string | undefined = requestBody.clerkUserId

  if (!clerkUserId) {
    return NextResponse.json({ error: 'One of the required data is missing!' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      include: { membership: { take: 1, orderBy: [{ endDate: 'desc' }] } },
    })

    if (!user) {
      return Response.json(null)
    }

    const membership = user.membership[0] ?? null

    return Response.json({ ...user, membership })
  } catch (error) {
    console.error(JSON.stringify(error, null, 2))
    return NextResponse.json({ error }, { status: 500 })
  }
}
