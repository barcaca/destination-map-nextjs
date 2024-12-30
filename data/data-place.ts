import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import { verifySession } from '@/lib/dal'
import type { Place } from '@/types/place'
import { revalidatePath } from 'next/cache'

export async function fetchPlaces(): Promise<Place[]> {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=SYSTEM`

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

export async function deleteUserPlace(placeId: string) {
  const session = await verifySession()

  if (!session?.isAuth) {
    return
  }

  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}/${placeId}`
  const options = { method: 'DELETE' }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Failed to delete session: ${response.statusText}`)
    }

    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting session:', error)
  }
}
