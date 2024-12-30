import type { StateContext } from '@/context/favorites-context'
import { ActionTypes, type Actions } from './actions'

export function reducer(state: StateContext, action: Actions): StateContext {
  switch (action.type) {
    case ActionTypes.GET_FAVORITE_DESTINATION:
      return {
        ...state,
        favorites: action.payload, // Atualiza a lista de favoritos diretamente com o array de strings
      }

    case ActionTypes.ADD_FAVORITE_DESTINATION:
      return {
        ...state,
        favorites: [...state.favorites, action.payload], // Adiciona o novo favorito (string) ao array
      }

    case ActionTypes.REMOVE_FAVORITE_DESTINATION:
      return {
        ...state,
        favorites: state.favorites.filter(
          placeId => placeId !== action.payload // Remove o favorito correspondente
        ),
      }

    default:
      return state // Retorna o estado atual se a ação não for reconhecida
  }
}
