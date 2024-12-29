import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchPlaceById } from '@/data/data-place'
import { Globe2Icon, HeartIcon } from 'lucide-react'
import Image from 'next/image'

const PlaceItem = async ({ destinoId }: { destinoId: string }) => {
  const place = await fetchPlaceById(destinoId)

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="mb-2 font-bold text-3xl md:text-4xl">{place.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe2Icon className="h-4 w-4" />
            <span>
              {place.location.continent.name}, {place.location.country.name}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label={
              place.favorite
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'
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
        </div>
      </header>
      <section className="mb-8 grid gap-4 lg:h-[500px] lg:grid-cols-3">
        <figure className="relative h-[242px] overflow-hidden rounded-lg lg:col-span-2 lg:h-auto">
          <Image
            src={place.images[0].url}
            alt={place.title}
            fill
            className="object-cover"
          />
        </figure>
        <div className="space-y-4">
          {place.images.slice(1).map((img, index) => (
            <figure
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="relative h-[242px] overflow-hidden rounded-lg"
            >
              <Image
                src={img.url}
                alt={`${place.title} - ${index + 2}`}
                fill
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </section>
      <article className="space-y-4">
        <h2 className="mb-2 font-semibold text-xl">Description</h2>
        <p className="text-muted-foreground">{place.description}</p>
      </article>
    </div>
  )
}

const PlaceItemSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Skeleton className="mb-2 h-8 w-40 sm:h-9" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
      <div className="mb-8 grid gap-4 lg:h-[500px] lg:grid-cols-3">
        <Skeleton className="relative h-[242px] rounded-lg lg:col-span-2 lg:h-auto" />
        <div className="space-y-4">
          {Array.from({ length: 3 })
            .slice(1)
            .map((img, index) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="relative h-[242px] rounded-lg"
              />
            ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-20 w-full max-w-sm" />
      </div>
    </div>
  )
}

export { PlaceItem, PlaceItemSkeleton }
