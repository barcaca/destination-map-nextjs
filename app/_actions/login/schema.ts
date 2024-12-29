import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
})

export const FormLoginSchema = formSchema
export type TFormLoginData = z.infer<typeof FormLoginSchema>
