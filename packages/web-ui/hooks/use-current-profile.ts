'use client'

import { currentProfile } from '@repo/clerk-action'
import { useQuery } from '@tanstack/react-query'

export function useCurrentProfile() {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => currentProfile(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  })

  return query
}
