'use client'

import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { PlaceCard } from '@/components/ui/place-card'
import { useFavorite } from '@/context/favorites-context'
import type { Place } from '@/types/place'

interface PlaceFavoritesProps {
  places: Place[]
  userId: string
}

const PlaceFavorites = ({ places, userId }: PlaceFavoritesProps) => {
  const { state } = useFavorite()
  const filteredPlaces = places.filter(place =>
    state.favorites.includes(place.id)
  )
  return filteredPlaces.length === 0 ? (
    <p>Voce ainda nao possui nenhum lugar favorito</p>
  ) : (
    <BentoGrid>
      {filteredPlaces.map((place, index) => {
        const colSpanPattern = [
          'lg:col-span-4',
          'lg:col-span-2',
          'lg:col-span-2',
          'lg:col-span-4',
        ]
        const colSpan = colSpanPattern[index % 4]
        return (
          <BentoCard key={place.id} className={colSpan}>
            <PlaceCard place={place} userId={userId} />
          </BentoCard>
        )
      })}
    </BentoGrid>
  )
}

export { PlaceFavorites }
