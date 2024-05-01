'use server'

import type { DeletedObjectJSON } from '@clerk/clerk-sdk-node'
import { prisma } from '@repo/prisma'

export async function userDeleted(clerkData: DeletedObjectJSON) {
  try {
    const user = await prisma.user.findFirst({ where: { clerkUserId: clerkData.id } })

    if (!user) return Response.json({ message: 'User already did not exist!' })

    //marketing data
    const marketingData = await prisma.marketingData.findUnique({ where: { userId: user.id } })
    if (marketingData) {
      await prisma.marketingData.delete({ where: { userId: user.id } })
    }

    //notifications
    const emailNotification = await prisma.emailNotification.findUnique({ where: { userId: user.id } })
    if (emailNotification) {
      await prisma.emailNotification.delete({ where: { userId: user.id } })
    }

    //membership
    const membership = await prisma.membership.findMany({ where: { userId: user.id } })
    if (membership.length > 0) {
      await prisma.membership.deleteMany({ where: { userId: user.id } })
    }

    //payment
    const payment = await prisma.payment.findMany({ where: { userId: user.id } })
    if (payment.length > 0) {
      await prisma.payment.deleteMany({ where: { userId: user.id } })
    }

    //telegram
    const telegram = await prisma.telegram.findUnique({ where: { userId: user.id } })
    if (telegram) {
      await prisma.telegram.delete({ where: { userId: user.id } })
    }

    //reply comments
    const websiteCommentReply = await prisma.websiteCommentReply.findMany({ where: { userId: user.id } })
    if (websiteCommentReply.length > 0) {
      await prisma.websiteCommentReply.deleteMany({ where: { userId: user.id } })
    }

    //main comments
    const mainComments = await prisma.websiteComment.findMany({ where: { userId: user.id } })
    if (mainComments.length > 0) {
      for (const mainComment of mainComments) {
        const websiteCommentReplyMainComment = await prisma.websiteCommentReply.findMany({
          where: { websiteCommentId: mainComment.id },
        })
        if (websiteCommentReplyMainComment.length > 0) {
          await prisma.websiteCommentReply.deleteMany({ where: { websiteCommentId: mainComment.id } })
        }
      }
    }

    // watchCourses
    const watchCourses = await prisma.watchCourses.findMany({ where: { userId: user.id } })
    if (watchCourses.length > 0) {
      await prisma.watchCourses.deleteMany({ where: { userId: user.id } })
    }

    // watchAnalisis
    const watchAnalisis = await prisma.watchAnalisis.findMany({ where: { userId: user.id } })
    if (watchAnalisis.length > 0) {
      await prisma.watchAnalisis.deleteMany({ where: { userId: user.id } })
    }

    const response = await prisma.user.delete({ where: { id: user.id } })

    return response
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}
