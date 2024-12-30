'use client'

import {
  addUserFavorite,
  fetchUserFavorites,
  removeUserFavorite,
} from '@/data/data-favorite'
import {
  addFavoriteDestinationAction,
  getFavoriteDestinationAction,
  removeFavoriteDestinationAction,
} from '@/reducers/actions'
import { reducer } from '@/reducers/reducer'

import type { Favorites } from '@/types/place'
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'

type FavoriteContextType = {
  state: StateContext
  addFavorite: (placeId: string) => void
  removeFavorite: (placeId: string) => void
}

export const FavoriteContext = createContext<FavoriteContextType>(
  {} as FavoriteContextType
)

export interface StateContext {
  favorites: Favorites
}

const initialState: StateContext = {
  favorites: {
    id: '',
    user_id: '',
    place_id: [
      {
        value: '',
      },
    ],
  },
}

interface FavoritesProviderProps {
  children: ReactNode
  userId: string | null
}

export function FavoritesProvider({
  children,
  userId,
}: FavoritesProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getPlaces() {
      const favorites = await fetchUserFavorites(userId as string)
      dispatch(getFavoriteDestinationAction(favorites))
    }

    if (userId) {
      getPlaces()
    }
  }, [userId])

  const addFavorite = async (placedId: string) => {
    dispatch(addFavoriteDestinationAction(placedId))
    await addUserFavorite(userId as string, placedId)
  }

  const removeFavorite = async (placeId: string) => {
    dispatch(removeFavoriteDestinationAction(placeId))
    await removeUserFavorite(userId as string, placeId)
  }

  const values = { state, addFavorite, removeFavorite }

  return (
    <FavoriteContext.Provider value={values}>
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorite = () => useContext(FavoriteContext)
