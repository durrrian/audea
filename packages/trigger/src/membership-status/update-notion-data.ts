import { cronTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { notion_internal } from '@repo/api'

export const updateNotionData = trigger.defineJob({
  id: 'update-notion-data',
  name: 'Update Notion Data',
  version: '0.1.0',

  trigger: cronTrigger({
    cron: '0 3 * * *',
  }),

  run: async (_payload, io, _ctx) => {
    const allUsers = await io.runTask('get-all-users', async () => {
      return prisma.user.findMany({
        include: { membership: { orderBy: [{ endDate: 'desc' }], take: 1 }, telegram: true, marketingData: true },
      })
    })

    for (const user of allUsers) {
      await io.runTask(
        `update-user-notion-${user.id}`,
        async () => {
          const membership = user.membership[0]

          const marketingData = user.marketingData

          const telegram = user.telegram

          // Update notion database
          const knowOrigin = marketingData ? marketingData.knowOrigin ?? '' : ''
          const telegramUserIdOrUsername = telegram ? telegram.username ?? telegram.telegramUserId : ''
          const membershipStatus = (() => {
            if (membership) {
              if (new Date() <= new Date(membership.endDate)) {
                return 'Active'
              } else {
                return 'Non-Active'
              }
            } else {
              return 'Non-Active'
            }
          })()
          const membershipType = membership ? membership.tier : 'NULL'

          const whatsapp = user.whatsappNumber ?? ''

          const membershipDuration = membership
            ? {
                'Membership Duration': {
                  date: {
                    start: new Date(membership.startDate).toISOString(),
                    end: new Date(membership.endDate).toISOString(),
                  },
                },
              }
            : null

          const properties = {
            Name: {
              title: [
                {
                  text: {
                    content: user.name,
                  },
                },
              ],
            },

            Email: {
              email: user.email,
            },

            'Join Date': {
              date: {
                start: new Date(user.createdAt).toISOString(),
              },
            },

            'Telegram User ID / Username': {
              rich_text: [
                {
                  text: {
                    content: telegramUserIdOrUsername,
                  },
                },
              ],
            },

            'Membership Status': {
              select: {
                name: membershipStatus,
              },
            },

            'Membership Type': {
              select: {
                name: membershipType,
              },
            },

            WhatsApp: {
              rich_text: [
                {
                  text: {
                    content: whatsapp,
                  },
                },
              ],
            },

            'Tau Supercuan Saham Darimana?': {
              rich_text: [
                {
                  text: {
                    content: knowOrigin,
                  },
                },
              ],
            },

            ...membershipDuration,
          }

          if (user.notionPageId) {
            await notion_internal.pages.update({
              page_id: user.notionPageId,
              properties,
            })
          } else {
            const notionPage = await notion_internal.pages.create({
              parent: {
                database_id: '83c6370e6dfb4d5dbe075e16d7af200e',
              },
              properties,
            })

            await prisma.user.update({ where: { id: user.id }, data: { notionPageId: notionPage.id } })
          }
        },
        { retry: { limit: 2 } },
      )
    }
  },
})
