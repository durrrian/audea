'use server'

import type { UserJSON } from '@clerk/clerk-sdk-node'
import { delay } from '@repo/helper'
import { prisma } from '@repo/prisma'

export async function userCreated(clerkData: UserJSON) {
  try {
    await delay(5000)

    const user = await prisma.user.findFirst({ where: { clerkUserId: clerkData.id } })

    if (user) return Response.json(user)

    const emailFind = clerkData.email_addresses.find(({ id }) => id === clerkData.primary_email_address_id)

    //it is impossible that a user can have no email
    if (!emailFind) return Response.json({ error: 'No primary email address found!' }, { status: 404 })

    const firstName = clerkData.first_name.trim()
    const lastName = clerkData.last_name.trim()

    const response = await prisma.user.create({
      data: {
        clerkUserId: clerkData.id,
        email: emailFind.email_address,
        name: `${firstName} ${lastName}`,
        photoUrl: clerkData.image_url,
      },
    })

    return response
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}
