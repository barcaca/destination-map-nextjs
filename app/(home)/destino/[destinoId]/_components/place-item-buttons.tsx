'use client'
import { Button } from '@/components/ui/button'
import { useFavorite } from '@/context/favorites-context'
import type { Place } from '@/types/place'
import { HeartIcon } from 'lucide-react'

interface PlaceItemButtonsProps {
  place: Place
  children: React.ReactNode
}
const PlaceItemButtons = ({ place, children }: PlaceItemButtonsProps) => {
  const { state, addFavorite, removeFavorite } = useFavorite()
  const isFavorite = state.favorites.some(val => val === place.id)

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(place.id)
      return
    }
    addFavorite(place.id)
  }
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        aria-label={
          isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
        className={`group/favorite h-8 w-8 rounded-full ${isFavorite ? 'bg-muted text-muted-foreground' : 'bg-muted/60 text-muted-foreground/50'} hover:bg-muted/90`}
        onClick={toggleFavorite}
      >
        <HeartIcon
          className={
            isFavorite
              ? 'fill-current text-red-500'
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
