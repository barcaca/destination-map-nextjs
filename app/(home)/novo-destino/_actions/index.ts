'use server'

import { NovoDestinoFormSchema, type TNovoDestinoData } from './schema'

export async function novoDestinoAction(
  prevState: unknown,
  formData: TNovoDestinoData
) {
  const validation = NovoDestinoFormSchema.safeParse(formData)

  if (!validation.success) {
    return { message: validation.error.errors[0].message, status: 400 }
  }

  return { message: 'Destino criado com sucesso!', status: 200 }
}
