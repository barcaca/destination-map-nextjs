'use client'

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
  favorites: [],
}

const USER_FAVORITE_KEY = '@destination-map:favorite'
interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const storedFavorite = localStorage.getItem(USER_FAVORITE_KEY)
    if (storedFavorite) {
      dispatch(getFavoriteDestinationAction(JSON.parse(storedFavorite)))
    } else {
      dispatch(getFavoriteDestinationAction([]))
      localStorage.setItem(USER_FAVORITE_KEY, JSON.stringify(initialState))
    }
  }, [])

  const addFavorite = async (placedId: string) => {
    dispatch(addFavoriteDestinationAction(placedId))
  }

  const removeFavorite = async (placeId: string) => {
    dispatch(removeFavoriteDestinationAction(placeId))
  }

  const buscarPlaces = async (favorites: string[]) => {}

  const saveToLocalStorage = (key: string, data: Favorites) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    saveToLocalStorage(USER_FAVORITE_KEY, state.favorites)
  }, [state.favorites])

  const values = { state, addFavorite, removeFavorite }

  return (
    <FavoriteContext.Provider value={values}>
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorite = () => useContext(FavoriteContext)
