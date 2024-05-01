/* eslint-disable import/no-duplicates -- following trigger.dev documentation */

import { createAppRoute } from '@trigger.dev/nextjs'
import { trigger } from '@repo/trigger'
import '@repo/trigger'

// this route is used to send and receive data with Trigger.dev
export const { POST, dynamic } = createAppRoute(trigger)

//uncomment this to set a higher max duration (it must be inside your plan limits). Full docs: https://vercel.com/docs/functions/serverless-functions/runtimes#max-duration
export const maxDuration = 300
