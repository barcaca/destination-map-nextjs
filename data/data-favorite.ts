'use server'

import { fetchPlaces } from './data-place'

export async function fetchFavoritePlaceByUser(placesIds: string[]) {
  const places = await fetchPlaces()
  const filteredPlaces = places.filter(place => placesIds.includes(place.id))

  return filteredPlaces
}
