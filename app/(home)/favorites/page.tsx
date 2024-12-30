import { fetchAllPlaces } from '@/data/data-place'
import { verifySession } from '@/lib/dal'
import { PlaceFavorites } from './_components/place-favorites'

export default async function FavoritosPage() {
  const session = await verifySession()
  const places = await fetchAllPlaces()

  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-10 font-bold text-4xl">
          Todos os seus lugares favoritos
        </h1>
        <PlaceFavorites places={places} userId={session?.userId as string} />
      </main>
    </div>
  )
}
