'use client'
import { deleteDestinoAction } from '@/app/_actions/delete-destino'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { customToast } from '@/lib/custom-toast'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useActionState, useEffect } from 'react'
import { Button } from './ui/button'

const DialogDeleteDestino = ({ placeId }: { placeId: string }) => {
  const router = useRouter()
  const [formState, formAction, isPending] = useActionState(
    deleteDestinoAction,
    undefined
  )

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startTransition(() => formAction(placeId))
  }

  useEffect(() => {
    if (formState) {
      customToast(formState)
      if (formState.redirect) {
        router.push(formState.redirect)
      }
    }
  }, [formState, router])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Editar"
          className={
            'group/favorite h-8 w-8 rounded-full bg-muted/40 text-muted-foreground/50 hover:bg-muted/90 '
          }
        >
          <Trash2Icon
            className="fill-current text-current group-hover/favorite:fill-destructive/50 group-hover/favorite:text-destructive"
            aria-hidden="true"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar destino</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar este destino?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>
          <form onSubmit={onSubmit}>
            <Button variant={'destructive'} type="submit" disabled={isPending}>
              Deletar
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogDeleteDestino }
