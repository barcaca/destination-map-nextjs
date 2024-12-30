'use server'

import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import type { Favorites } from '@/types/place'
import { revalidatePath } from 'next/cache'

export async function fetchUserFavorites(userId: string): Promise<
  {
    value: string
  }[]
> {
  const url = `${BASE_URL.REST}${ENDPOINTS.FAVORITE}?user_id=${userId}`

  try {
    const response = await fetch(url)
    const favorite: Favorites[] = await response.json()

    const favoriteExist = favorite[0]

    return favoriteExist.place_id
  } catch (error) {
    return []
  }
}

export async function addUserFavorite(
  userId: string,
  placeId: string
): Promise<void> {
  const url = `${BASE_URL.REST}${ENDPOINTS.FAVORITE}?user_id=${userId}`

  const userResponse = await fetch(url)
  const user: Favorites[] = await userResponse.json()

  if (!user.length) {
    return
  }

  const existingUser = user[0]
  const newPlace = { value: placeId }

  existingUser.place_id.push(newPlace)

  const updateUrl = `${BASE_URL.REST}${ENDPOINTS.FAVORITE}/${existingUser.id}`
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ place_id: existingUser.place_id }),
  }

  try {
    const response = await fetch(updateUrl, options)

    if (!response.ok) {
      throw new Error(`Failed to add favorite: ${response.statusText}`)
    }

    revalidatePath('/')
  } catch (error) {
    console.error('Error adding favorite:', error)
  }
}

export async function removeUserFavorite(
  userId: string,
  placeId: string
): Promise<void> {
  const url = `${BASE_URL.REST}${ENDPOINTS.FAVORITE}?user_id=${userId}`

  const userResponse = await fetch(url)
  const user: Favorites[] = await userResponse.json()

  if (!user.length) {
    return
  }

  const existingUser = user[0]
  const newPlace = { value: placeId }

  existingUser.place_id = existingUser.place_id.filter(
    place => place.value !== placeId
  )

  const updateUrl = `${BASE_URL.REST}${ENDPOINTS.FAVORITE}/${existingUser.id}`
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ place_id: existingUser.place_id }),
  }

  try {
    const response = await fetch(updateUrl, options)

    if (!response.ok) {
      throw new Error(`Failed to add favorite: ${response.statusText}`)
    }

    revalidatePath('/')
  } catch (error) {
    console.error('Error adding favorite:', error)
  }
}
