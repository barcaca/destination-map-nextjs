import type { StateContext } from '@/context/favorites-context'
import { ActionTypes, type Actions } from './actions'

export function reducer(state: StateContext, action: Actions): StateContext {
  switch (action.type) {
    case ActionTypes.GET_FAVORITE_DESTINATION:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          place_id: action.payload,
        },
      }
    case ActionTypes.ADD_FAVORITE_DESTINATION:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          place_id: [...state.favorites.place_id, { value: action.payload }],
        },
      }
    case ActionTypes.REMOVE_FAVORITE_DESTINATION:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          place_id: state.favorites.place_id.filter(
            place => place.value !== action.payload
          ),
        },
      }
    default:
      return state
  }
}
