import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import type { Place } from '@/types/place'

export async function fetchPlaces(): Promise<Place[]> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=SYSTEM`

  const response = await fetch(url)
  const places: Place[] = await response.json()

  return places
}
