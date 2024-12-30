export enum ActionTypes {
  ADD_FAVORITE_DESTINATION = 'ADD_FAVORITE_DESTINATION',
  REMOVE_FAVORITE_DESTINATION = 'REMOVE_FAVORITE_DESTINATION',
  GET_FAVORITE_DESTINATION = 'GET_FAVORITE_DESTINATION',
}

export type Actions =
  | {
      type: ActionTypes.ADD_FAVORITE_DESTINATION
      payload: string
    }
  | {
      type: ActionTypes.REMOVE_FAVORITE_DESTINATION
      payload: string
    }
  | {
      type: ActionTypes.GET_FAVORITE_DESTINATION
      payload: {
        value: string
      }[]
    }

export const addFavoriteDestinationAction = (placeId: string) =>
  ({
    type: ActionTypes.ADD_FAVORITE_DESTINATION,
    payload: placeId,
  }) satisfies Actions

export const removeFavoriteDestinationAction = (placeId: string) =>
  ({
    type: ActionTypes.REMOVE_FAVORITE_DESTINATION,
    payload: placeId,
  }) satisfies Actions

export const getFavoriteDestinationAction = (
  placeIds: {
    value: string
  }[]
) =>
  ({
    type: ActionTypes.GET_FAVORITE_DESTINATION,
    payload: placeIds,
  }) satisfies Actions
