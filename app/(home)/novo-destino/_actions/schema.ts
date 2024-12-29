import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Titulo deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().min(10, {
    message: 'Descrição deve ter pelo menos 10 caracteres.',
  }),
  location: z.object({
    continent: z.object({
      id: z.coerce.number(),
      name: z.string().nonempty('Selecione um continente'),
    }),
    country: z.object({
      id: z.coerce.number(),
      name: z.string().nonempty('Selecione um país'),
    }),
    state: z.object({
      id: z.coerce.number(),
      name: z.string().nonempty('Selecione um estado'),
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

export const NovoDestinoFormSchema = formSchema
export type TNovoDestinoData = z.infer<typeof NovoDestinoFormSchema>
