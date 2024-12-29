import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { PlaceCard } from '@/components/ui/place-card'
import { fetchUserPlaces } from '@/data/data-place'
import type { Place } from '@/types/place'
import { Link, UserCircle2 } from 'lucide-react'

const UserPlacesWrapper = async ({ userId }: { userId: string }) => {
  const userPlaces = await fetchUserPlaces(userId)

  return (
    <section
      aria-labelledby="user-places-heading"
      className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2
            id="user-places-heading"
            className="inline-flex items-center gap-2 font-bold text-3xl tracking-tight sm:text-4xl"
          >
            <UserCircle2 className="size-6" aria-hidden="true" />
            Meus lugares
          </h2>
          {userPlaces.length > 4 && (
            <Button asChild>
              <Link href={`/meus-lugares/${userId}`}>Ver todos lugares</Link>
            </Button>
          )}
        </div>
        <p className="mt-2 max-w-2xl text-lg text-muted-foreground leading-8">
          {userPlaces.length === 0
            ? 'Você ainda não adicionou nenhum lugar.'
            : 'O Destinos que você já visitou, ou que você gostaria de visitar.'}
        </p>
      </div>
      <UserPlaces userPlaces={userPlaces} userId={userId} />
    </section>
  )
}

interface UserPlacesProps {
  userPlaces: Place[]
  userId: string
}

const UserPlaces = ({ userPlaces, userId }: UserPlacesProps) => {
  return (
    <BentoGrid>
      {userPlaces.slice(0, 4).map((place, index) => {
        const colSpan =
          index === 1 || index === 2 ? 'lg:col-span-2' : 'lg:col-span-4'
        return (
          <BentoCard key={place.id} className={colSpan}>
            <PlaceCard place={place} userId={userId} />
          </BentoCard>
        )
      })}
    </BentoGrid>
  )
}

export { UserPlacesWrapper }
