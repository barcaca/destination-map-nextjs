'use server'

import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import { verifySession } from '@/lib/dal'

export async function deleteDestinoAction(prevState: unknown, placeId: string) {
  const session = await verifySession()

  if (!session?.isAuth) {
    return { message: 'Nao autorizado', status: 401 }
  }

  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}/${placeId}`
  const options = { method: 'DELETE' }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      return { message: 'Nao autorizado', status: 401 }
    }

    return {
      message: 'Destino deletado com sucesso!',
      status: 200,
      redirect: '/',
    }
  } catch (error) {
    return { message: 'Nao autorizado', status: 401 }
  }
}
