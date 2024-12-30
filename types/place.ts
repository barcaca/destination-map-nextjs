import type { Location } from './location'

export type Place = {
  id: string
  title: string
  description: string
  location: Location
  images: {
    url: string
  }[]
  user_id: string
  favorite: boolean
}

export type Favorites = string[]
