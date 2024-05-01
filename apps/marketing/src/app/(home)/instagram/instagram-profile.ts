/* eslint-disable @typescript-eslint/no-unsafe-member-access -- okay */

'use server'

import axios from 'axios'

export async function instagramProfile() {
  try {
    const newAxios = axios.create({
      headers: {
        Referer: 'https://www.instagram.com/',
        Origin: 'https://www.instagram.com',
        cookie:
          'csrftoken=khKLjoBczQ6oCnloyr9WAjOMFwKa9bcG; mid=ZaN8fgAEAAH65MUfx7o3aZi2XB4h; ig_did=8CF4AC32-9410-4BFD-8E05-0628883159D2; ig_nrcb=1; ps_l=0; ps_n=0',
        'User-Agent':
          'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)',
        //   'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      },
    })

    const { data } = await newAxios.get(
      'https://i.instagram.com/api/v1/users/web_profile_info/?username=supercuanporto',
    )

    const response = {
      followers_count: data.data.user.edge_followed_by.count,
      follows_count: data.data.user.edge_follow.count,
      media_count: data.data.user.edge_owner_to_timeline_media.count,
      profile_picture_url: data.data.user.profile_pic_url,
      biography: data.data.user.biography,
    }

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
