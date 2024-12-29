'use server'

import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import { verifySession } from '@/lib/dal'
import { revalidatePath } from 'next/cache'
import { EditDestinoFormSchema, type TEditDestinoData } from './schema'

export async function editDestinoAction(
  prevState: unknown,
  formData: TEditDestinoData
) {
  const validation = EditDestinoFormSchema.safeParse(formData)

  if (!validation.success)
    return { message: validation.error.message, status: 400 }

  const user = await verifySession()

  if (!user?.isAuth) return { message: 'Não há usuário logado', status: 401 }

  const validationData = validation.data
  const validationDataWithId = {
    ...validationData,
    user_id: user.userId,
  }

  try {
    const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}/${validationData.id}`
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationDataWithId),
    }

    const response = await fetch(url, options)

    if (!response.ok) throw new Error('Falha ao editar o destino')

    revalidatePath('/')

    return { message: 'Destino editado com sucesso', status: 200 }
  } catch (error) {
    return { message: 'Erro ao editar o destino', status: 500 }
  }
}
