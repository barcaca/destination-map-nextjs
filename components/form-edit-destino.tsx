'use client'
import { editDestinoAction } from '@/app/_actions/edit-destino'
import {
  EditDestinoFormSchema,
  type TEditDestinoData,
} from '@/app/_actions/edit-destino/schema'
import { fetchCountries, fetchStates } from '@/data/data-location'
import regionsData from '@/json/regions.json'
import { customToast } from '@/lib/custom-toast'
import type { Country, Region, State } from '@/types/location'
import type { Place } from '@/types/place'
import { zodResolver } from '@hookform/resolvers/zod'
import { PenIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { CustomCommandSelect } from './custom-command-select'
import { CustomFormField } from './custom-form-field'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Form } from './ui/form'

interface FormEditDestinoProps {
  place: Place
  onCloseDialog: () => void
}

const FormEditDestino = ({ place, onCloseDialog }: FormEditDestinoProps) => {
  const [formState, formAction, isPending] = useActionState(
    editDestinoAction,
    undefined
  )

  const [regions] = useState<Region[]>(regionsData)
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])

  const defaultValues = {
    id: place.id,
    title: place.title,
    description: place.description,
    location: {
      continent: {
        id: place.location.continent.id,
        name: place.location.continent.name,
      },
      country: {
        id: place.location.country.id,
        name: place.location.country.name,
      },
      state: { id: place.location.state.id, name: place.location.state.name },
    },
    images: place.images,
  }
  const form = useForm<TEditDestinoData>({
    resolver: zodResolver(EditDestinoFormSchema),
    defaultValues,
  })

  const { control, watch } = form
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

  async function onSubmit(formData: TEditDestinoData) {
    startTransition(() => formAction(formData))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (formState) {
      customToast(formState)
      if (formState.status < 400) {
        onCloseDialog()
      }
    }
  }, [formState])

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          name="title"
          label="Nome do destino"
          placeholder="Insira o nome do destino"
          defaultValue={place.title}
        />
        <div className="grid grid-cols-2 gap-2">
          <CustomCommandSelect
            name="location.continent.name"
            nameValue="location.continent"
            label="Região"
            items={regions}
            emptyMessage="Nenhuma região encontrada"
            placeholder="Região"
            placeholderSearch="Busque uma região"
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
          defaultValue={place.description}
        />

        <div className="space-y-4">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex w-full items-end gap-2">
                <CustomFormField
                  name={`images.${index}.url`}
                  label={`URL da Imagem ${index + 1}`}
                  placeholder="https://exemplo.com/imagem.jpg"
                  defaultValue={field.url}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  className={index === 0 ? 'hidden' : ''}
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

const DialogEditDestino = ({ place }: { place: Place }) => {
  const [open, setOpen] = useState(false)
  function handleCloseDialog() {
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Editar"
          className={
            'group/favorite h-8 w-8 rounded-full bg-muted/60 text-muted-foreground/50 hover:bg-muted/90'
          }
        >
          <PenIcon className="fill-current text-current" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar destino</DialogTitle>
          <DialogDescription>Edite as informações do destino</DialogDescription>
        </DialogHeader>
        <FormEditDestino place={place} onCloseDialog={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  )
}

export { DialogEditDestino }
