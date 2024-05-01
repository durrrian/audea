'use server'

interface InstagramData {
  id: string
  caption: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
}

export async function instagramMedia() {
  const userId = process.env.INSTAGRAM_USER_ID
  const accessToken = process.env.INSTAGRAM_TOKEN

  try {
    const res = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=media_url,media_type,caption&access_token=${accessToken}`,
    )

    if (!res.ok) throw new Error('Failed to fetch Instagram data')

    const { data }: { data: InstagramData[] } = await res.json()

    return data.filter((v) => v.media_type !== 'VIDEO').slice(0, 8)
  } catch (error) {
    console.error(error)
    throw error
  }
}
