import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import type { Place } from '@/types/place'

export async function fetchPlaces(): Promise<Place[]> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=SYSTEM`

  const response = await fetch(url)
  const places: Place[] = await response.json()

  return places
}

export async function fetchAllPlaces(): Promise<Place[]> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}`
  const response = await fetch(url)
  const places: Place[] = await response.json()

  return places
}

export async function fetchPlaceById(id: string): Promise<Place> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}/${id}`

  const response = await fetch(url)
  const place: Place = await response.json()

  return place
}

export async function fetchUserPlaces(userId: string): Promise<Place[]> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=${userId}`

  const response = await fetch(url)
  const places: Place[] = await response.json()

  return places
}

export async function fetchContinentsPlaces(continent: string) {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=SYSTEM&location.continent.name=${continent}`
  const response = await fetch(url)
  const places: Place[] = await response.json()

  return places
}
