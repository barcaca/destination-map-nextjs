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
import { deleteUserPlace } from '@/data/data-place'
import { Trash2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Button } from './ui/button'

const DialogDeleteDestino = ({ placeId }: { placeId: string }) => {
  async function handleDeleteDestino() {
    'use server'
    await deleteUserPlace(placeId)
    redirect('/')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Editar"
          className={
            'group/favorite h-8 w-8 rounded-full bg-muted/60 text-muted-foreground/50 hover:bg-muted/90 '
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
          <form action={handleDeleteDestino}>
            <Button variant={'destructive'} type="submit">
              Deletar
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogDeleteDestino }
