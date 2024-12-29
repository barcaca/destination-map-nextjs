'use server'

import { createSession, deleteSession } from '@/lib/session'
import { FormLoginSchema, type TFormLoginData } from './schema'

export async function signUpAction(
  prevState: unknown,
  formData: TFormLoginData
) {
  const parsedEmail = FormLoginSchema.safeParse(formData)

  if (!parsedEmail.success) {
    return { message: parsedEmail.error.errors[0].message, status: 400 }
  }

  const userId = crypto.randomUUID()
  const favoriteId = crypto.randomUUID()

  const { email } = parsedEmail.data

  const user = {
    id: userId,
    email: email,
    favorite_id: favoriteId,
  }

  await createSession(userId, email, favoriteId)

  return { message: 'Usuário criado com sucesso!', status: 200 }
}

export async function logoutAction(prevState: unknown) {
  await deleteSession()
  return { message: 'Usuário deslogado com sucesso!', status: 200 }
}
