'use server'

import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import { verifySession } from '@/lib/dal'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'node:crypto'
import { NovoDestinoFormSchema, type TNovoDestinoData } from './schema'

export async function novoDestinoAction(
  prevState: unknown,
  formData: TNovoDestinoData
) {
  const validation = NovoDestinoFormSchema.safeParse(formData)

  if (!validation.success)
    return { message: validation.error.message, status: 400 }

  const user = await verifySession()

  if (!user?.isAuth) return { message: 'Não há usuário logado', status: 401 }

  const validationData = validation.data
  const validationDataWithId = {
    id: randomUUID(),
    ...validationData,
    user_id: user.userId,
  }

  try {
    const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationDataWithId),
    }

    const response = await fetch(url, options)

    if (!response.ok) throw new Error('Falha ao criar o destino')

    revalidatePath('/')

    return { message: 'Destino criado com sucesso', status: 200 }
  } catch (error) {
    return { message: 'Erro ao criar o destino', status: 500 }
  }
}
