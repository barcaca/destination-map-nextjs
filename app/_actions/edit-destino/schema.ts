import { z } from 'zod'

const formSchema = z.object({
  id: z.coerce.string(),
  title: z.string().min(2, {
    message: 'Titulo deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().min(10, {
    message: 'Descrição deve ter pelo menos 10 caracteres.',
  }),
  location: z.object({
    continent: z.object({
      id: z.coerce.number(),
      name: z.string().nonempty('Selecione uma regiao'),
    }),
    country: z.object({
      id: z.coerce.number(),
      name: z.string().nonempty('Selecione uma regiao'),
    }),
    state: z.object({
      id: z.coerce.number(),
      name: z.string().nonempty('Selecione uma regiao'),
    }),
  }),
  images: z
    .array(
      z.object({
        url: z.string().url('A URL deve ser válida.'),
      })
    )
    .nonempty('Please add at least one image.'),
  favorite: z.boolean().default(false),
})

export const EditDestinoFormSchema = formSchema
export type TEditDestinoData = z.infer<typeof EditDestinoFormSchema>
