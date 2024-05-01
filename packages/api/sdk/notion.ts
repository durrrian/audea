import { Client } from '@notionhq/client'

export const notion_internal = new Client({
  auth: process.env.NOTION_INTEGRATION!!,
})
