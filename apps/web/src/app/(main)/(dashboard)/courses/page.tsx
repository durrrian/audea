import { currentProfile } from '@repo/clerk-action'
import { redirect } from 'next/navigation'
import { getWatchedCourses } from './get-watched-courses'
import { Client } from './client'

export default async function Page() {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const watchedCourses = await getWatchedCourses(user.id)

  return <Client initialData={watchedCourses} userId={user.id} />
}
