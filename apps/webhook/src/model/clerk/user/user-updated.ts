'use server'

import type { UserJSON } from '@clerk/clerk-sdk-node'
import { prisma } from '@repo/prisma'

export async function userUpdated(clerkData: UserJSON) {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { clerkUserId: clerkData.id } })

    const emailFind = clerkData.email_addresses.find(({ id }) => id === clerkData.primary_email_address_id)

    //it is impossible that a user can have no email
    if (!emailFind) return Response.json({ error: 'No primary email address found!' }, { status: 404 })

    const email = emailFind.email_address
    const photoUrl = clerkData.image_url
    const firstName = clerkData.first_name.trim()
    const lastName = clerkData.last_name.trim()

    const response = await prisma.user.update({
      where: { id: user.id },
      data: { email, name: `${firstName} ${lastName}`, photoUrl },
    })

    return response
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}
