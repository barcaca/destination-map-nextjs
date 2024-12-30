import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { PlaceCard } from '@/components/ui/place-card'
import { fetchContinentsPlaces } from '@/data/data-place'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default async function ContinentPage({
  params,
}: { params: Promise<{ continenteName: string }> }) {
  const { continenteName } = await params
  const continente = capitalizeFirstLetter(continenteName)
  const places = await fetchContinentsPlaces(continente)

  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-10 font-bold text-4xl">
          Todos os lugares em {continente}
        </h1>
        <BentoGrid>
          {places.map((place, index) => {
            const colSpanPattern = [
              'lg:col-span-4',
              'lg:col-span-2',
              'lg:col-span-2',
              'lg:col-span-4',
            ]
            const colSpan = colSpanPattern[index % 4]
            return (
              <BentoCard key={place.id} className={colSpan}>
                <PlaceCard place={place} />
              </BentoCard>
            )
          })}
        </BentoGrid>
      </main>
    </div>
  )
}
