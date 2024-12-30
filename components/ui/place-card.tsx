import placeHolder from '@/public/placeholder-image.svg'
import type { Place } from '@/types/place'
import { HeartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DialogDeleteDestino } from '../form-delete-destino'
import { DialogEditDestino } from '../form-edit-destino'
import { Button } from './button'

interface PlaceCardProps {
  place: Place
  userId?: string
}

const PlaceCard = ({ place, userId }: PlaceCardProps) => {
  const isFavorite = false
  const { location } = place
  const isUser = userId === place.user_id

  return (
    <div className="group relative flex w-full overflow-hidden rounded-xl shadow-shape">
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute top-2 right-2 z-40 flex flex-col space-y-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={
            isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
          }
          className={`group/favorite h-8 w-8 rounded-full ${isFavorite ? 'bg-muted text-muted-foreground' : 'bg-muted/60 text-muted-foreground/50'} hover:bg-muted/90`}
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
        {/* TODO : Add edit and delete options when is created by user */}
        {isUser && (
          <>
            <DialogEditDestino place={place} />
            <DialogDeleteDestino placeId={place.id} />
          </>
        )}
      </div>
      <div className="relative aspect-[4/3] w-full rounded-md">
        <Image
          alt={`Imagem de ${place.title}, ${location.country.name}`}
          src={place.images[0]?.url || placeHolder}
          fill
          sizes="100%"
          className="h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 z-20 p-4">
        <h3 className="mt-2 font-semibold text-background text-lg">
          {place.title}
        </h3>
        <p className="text-background/80 text-sm">
          {location.country.name}, {location.state.name}
        </p>
        <p className="mt-2 line-clamp-2 text-background/50 text-sm">
          {place.description}
        </p>
      </div>
      <Link href={`/destino/${place.id}`} className="absolute inset-0 z-30">
        <span className="sr-only">Ver detalhes de {place.title}</span>
      </Link>
    </div>
  )
}

export { PlaceCard }
