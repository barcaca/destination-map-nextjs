import { PlaceCard } from '@/components/ui/place-card'
import { Skeleton } from '@/components/ui/skeleton'
import { BASE_URL } from '@/constants/base'
import { ENDPOINTS } from '@/constants/endpoints'
import { generateUniqueRandomNumbers } from '@/lib/utils'

async function fetchRecommendations() {
  const url = `${BASE_URL.REST}${ENDPOINTS.PLACES}?user_id=SYSTEM`
  const response = await fetch(url)
  const places = await response.json()
  const randomPlaceIndexes = generateUniqueRandomNumbers(4, places.length)
  const recommendations = randomPlaceIndexes.map(i => places[i])
  return recommendations
}

const Recommendations = async () => {
  const recommendations = await fetchRecommendations()
  return (
    <section
      aria-labelledby="recommendations-heading"
      className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="recommendations-heading"
          className="font-bold text-3xl tracking-tight sm:text-4xl"
        >
          Recomendados
        </h2>
        <p className="mt-2 text-lg text-muted-foreground leading-8">
          Destinos recomendados para você e sua família para aproveitar
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-2 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recommendations.map(place => (
          <div
            key={place.id}
            className="relative flex w-full flex-none flex-col"
          >
            <PlaceCard place={place} />
          </div>
        ))}
      </div>
    </section>
  )
}

const RecommendationsSkeleton = () => {
  return (
    <div className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2">
        <Skeleton className="h-8 w-1/2 sm:h-9" />
        <Skeleton className="h-7 w-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 p-2 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="relative flex w-full flex-none flex-col"
          >
            <Skeleton className="aspect-[4/3] h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export { Recommendations, RecommendationsSkeleton }
