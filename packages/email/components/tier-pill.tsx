import { Text } from '@react-email/components'

export type Tier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'

interface TierPillProps {
  tier: Tier
}

export function TierPill({ tier }: TierPillProps) {
  const backgroundStyle = {
    bronze: {
      background: `linear-gradient(0deg, #d09742 0%, #d09742 100%),
                    linear-gradient(339deg, rgba(255, 255, 255, 0) 52.79%, rgba(255, 255, 255, 0.5) 95.95%),
                    linear-gradient(
                        77deg,
                        #576265 11.6%,
                        #9ea1a1 25.31%,
                        #848b8a 48.06%,
                        #576265 55.72%,
                        #576265 77.23%,
                        #757a7b 85.34%,
                        #576265 91.31%
                    )`,
      backgroundBlendMode: 'color, overlay, normal',
    },
    silver: {
      background: `linear-gradient(0deg, #cdc9c2 0%, #cdc9c2 100%),
                    linear-gradient(339deg, rgba(255, 255, 255, 0) 52.79%, rgba(255, 255, 255, 0.5) 95.95%),
                    linear-gradient(
                        77deg,
                        #576265 11.6%,
                        #9ea1a1 25.31%,
                        #848b8a 48.06%,
                        #576265 55.72%,
                        #576265 77.23%,
                        #757a7b 85.34%,
                        #576265 91.31%
                    )`,
      backgroundBlendMode: 'color, overlay, normal',
    },
    gold: {
      background: `linear-gradient(0deg, #c1a875 0%, #c1a875 100%),
                    linear-gradient(339deg, rgba(255, 255, 255, 0) 52.79%, rgba(255, 255, 255, 0.5) 95.95%),
                    linear-gradient(
                        77deg,
                        #576265 11.6%,
                        #9ea1a1 25.31%,
                        #848b8a 48.06%,
                        #576265 55.72%,
                        #576265 77.23%,
                        #757a7b 85.34%,
                        #576265 91.31%
                    )`,
      backgroundBlendMode: 'color, overlay, normal',
    },
    platinum: {
      background: 'linear-gradient(90deg, #1f365f 0%, #c33764 100%)',
    },
  }

  const renderStyle = () => {
    if (tier === 'BRONZE') return backgroundStyle.bronze
    else if (tier === 'SILVER') return backgroundStyle.silver
    else if (tier === 'GOLD') return backgroundStyle.gold

    return backgroundStyle.platinum
  }

  return (
    <Text
      style={{
        padding: '0.25rem 1rem',
        borderRadius: '1.5rem',
        color: 'rgb(254, 255, 247, 1)',
        width: 'fit-content',
        ...renderStyle(),
      }}
    >
      {tier[0]}
      {tier.slice(1, tier.length).toLowerCase()}
    </Text>
  )
}
