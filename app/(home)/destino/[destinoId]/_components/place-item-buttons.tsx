import { Button } from '@/components/ui/button'
import type { Place } from '@/types/place'
import { HeartIcon } from 'lucide-react'

interface PlaceItemButtonsProps {
  place: Place
  children: React.ReactNode
}
const PlaceItemButtons = ({ place, children }: PlaceItemButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label={
          place.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
        className={`group/favorite z-40 h-8 w-8 rounded-full ${place.favorite ? 'bg-muted text-muted-foreground' : 'bg-muted/40 text-muted-foreground/50'} hover:bg-muted/90`}
      >
        <HeartIcon
          className={
            place.favorite
              ? 'text-red-500'
              : 'fill-current text-current group-hover/favorite:text-red-500'
          }
          aria-hidden="true"
        />
      </Button>
      {children}
    </div>
  )
}

export { PlaceItemButtons }
