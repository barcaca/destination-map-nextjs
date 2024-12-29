'use client'

import { CustomCommandSelect } from '@/components/custom-command-select'
import { CustomFormField } from '@/components/custom-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { fetchCountries, fetchStates } from '@/data/data-location'
import regionsData from '@/json/regions.json'
import { customToast } from '@/lib/custom-toast'
import type { Country, Region, State } from '@/types/location'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { novoDestinoAction } from '../_actions'
import {
  NovoDestinoFormSchema,
  type TNovoDestinoData,
} from '../_actions/schema'

const defaultValues = {
  title: '',
  description: '',
  location: {
    continent: { id: undefined, name: '' },
    country: { id: undefined, name: '' },
    state: { id: undefined, name: '' },
  },
  images: [{ url: '' }],
}

const FormNovoDestino = () => {
  const [formState, formAction, isPending] = useActionState(
    novoDestinoAction,
    undefined
  )

  const [regions] = useState<Region[]>(regionsData)
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])

  const form = useForm<TNovoDestinoData>({
    resolver: zodResolver(NovoDestinoFormSchema),
    defaultValues,
  })
  const { control, watch, reset, getValues } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  useEffect(() => {
    if (fields.length === 0) {
      append({ url: '' })
    }
  }, [fields, append])

  const watchContinent = watch('location.continent')
  const watchCountry = watch('location.country')

  useEffect(() => {
    if (watchContinent.id) {
      fetchCountries(watchContinent.id).then(setCountries)
    }
  }, [watchContinent])

  useEffect(() => {
    if (watchCountry.id) {
      fetchStates(watchCountry.id).then(setStates)
    }
  }, [watchCountry])

  async function onSubmit(formData: TNovoDestinoData) {
    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (formState) {
      customToast(formState)
      formState.status < 400 && reset()
    }
  }, [formState, reset])

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <CustomFormField
              name="title"
              label="Nome do destino"
              placeholder="Insira o nome do destino"
            />
            <div className="grid grid-cols-3 gap-2">
              <CustomCommandSelect
                name="location.continent.name"
                nameValue="location.continent"
                label="Continente"
                items={regions}
                emptyMessage="Nenhum continente encontrado"
                placeholder="Continente"
                placeholderSearch="Busque um continente"
              />
              <CustomCommandSelect
                name="location.country.name"
                nameValue="location.country"
                label="País"
                items={countries}
                emptyMessage="Nenhuma país encontrada"
                placeholder="País"
                placeholderSearch="Busque uma país"
              />
              <CustomCommandSelect
                name="location.state.name"
                nameValue="location.state"
                label="Estado"
                items={states}
                emptyMessage="Nenhuma estado encontrada"
                placeholder="Estado"
                placeholderSearch="Busque um estado"
              />
            </div>
            <CustomFormField
              name="description"
              label="Descrição"
              placeholder="Descreva o destino..."
              type="textarea"
            />
          </div>
          <div className="space-y-4">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="relative flex w-full gap-2">
                  <CustomFormField
                    name={`images.${index}.url`}
                    label={`URL da Imagem ${index + 1}`}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    className={
                      index === 0 ? 'hidden' : 'relative top-8 right-0'
                    }
                    disabled={fields.length === 1}
                  >
                    <Trash2Icon size={16} />
                  </Button>
                </div>
              )
            })}
            {fields.length < 3 && (
              <Button
                className="w-full"
                type="button"
                variant={'outline'}
                onClick={() => {
                  if (fields.length >= 3) return
                  append({ url: '' })
                }}
              >
                <PlusIcon size={16} /> Nova imagem
              </Button>
            )}
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          Salvar destino
        </Button>
      </form>
    </Form>
  )
}

export { FormNovoDestino }
