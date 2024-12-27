import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { PlaceCard } from '@/components/ui/place-card'
import { fetchPlaces } from '@/data/data-place'
import type { Place } from '@/types/place'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import type { JSX } from 'react'

interface Continent {
  description: string
  icons: JSX.Element
}
const CONTINENTS: Record<string, Continent> = {
  Africa: {
    description:
      'A África é conhecida por sua rica diversidade cultural, fauna selvagem e vastos desertos como o Saara.',
    icons: <Icons.earthAfrica className="size-6" aria-hidden="true" />,
  },
  America: {
    description:
      'A América é composta por três regiões principais: América do Norte, Central e do Sul, com paisagens variadas e culturas vibrantes.',
    icons: <Icons.earthAmerica className="size-6" aria-hidden="true" />,
  },
  Asia: {
    description:
      'A Ásia é o maior continente, conhecido por sua diversidade cultural, tecnológica e paisagens impressionantes, como os Himalaias.',
    icons: <Icons.earthAsia className="size-6" aria-hidden="true" />,
  },
  Europa: {
    description:
      'A Europa é um continente de rica história, cultura influente e belas cidades, como Paris, Roma e Londres.',
    icons: <Icons.earthEurope className="size-6" aria-hidden="true" />,
  },
  Oceania: {
    description:
      'A Oceania é composta por várias ilhas no Pacífico, com destaque para a Austrália, Nova Zelândia e a diversidade marinha das ilhas do Pacífico.',
    icons: <Icons.earthOceania className="size-6" aria-hidden="true" />,
  },
}

async function fetchPlacesByContinent() {
  const places = await fetchPlaces()

  const groupedContinents = places.reduce(
    (acc: Record<string, Place[]>, place) => {
      const continent = place.location.continent.name
      acc[continent] = (acc[continent] || []).concat(place)
      return acc
    },
    {}
  )

  return groupedContinents
}
const ContinentsWrapper = async () => {
  const groupedContinents = await fetchPlacesByContinent()

  return Object.keys(groupedContinents || {}).map(continent => {
    const lengthPlaces = groupedContinents[continent].length
    const { description, icons } = CONTINENTS[continent]

    return (
      <section
        key={continent}
        aria-labelledby="continents-heading"
        className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2
              id="continents-heading"
              className="inline-flex items-center gap-2 font-bold text-3xl tracking-tight sm:text-4xl"
            >
              {icons}
              {continent}
            </h2>
            {lengthPlaces > 2 && (
              <Button asChild>
                <Link href={`/continente/${continent.toLowerCase()}`}>
                  Ver todos lugares em {continent}{' '}
                </Link>
              </Button>
            )}
          </div>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground leading-8">
            {description}
          </p>
        </div>
        <Continents items={groupedContinents} continent={continent} />
      </section>
    )
  })
}

interface ContinentsProps {
  items: Record<string, Place[]>
  continent: string
}

const Continents = ({ items, continent }: ContinentsProps) => {
  return (
    <BentoGrid>
      {items[continent].slice(0, 4).map((place, index) => {
        const colSpan =
          index === 1 || index === 2 ? 'lg:col-span-2' : 'lg:col-span-4'
        return (
          <BentoCard key={place.id} className={colSpan}>
            <PlaceCard place={place} />
          </BentoCard>
        )
      })}
    </BentoGrid>
  )
}

const ContinentsSkeleton = () => {
  return (
    <div className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="flex items-center justify-between ">
          <div className="flex w-full items-center space-x-2">
            <Skeleton className="size-6" />
            <Skeleton className="h-8 w-40 sm:h-9" />
          </div>
          <Skeleton className="h-9 w-full max-w-xs" />
        </div>
        <Skeleton className="mt-2 h-7 w-full max-w-2xl" />
      </div>
      <BentoGrid>
        {Array.from({ length: 4 }).map((_, index) => {
          const colSpan =
            index === 1 || index === 2 ? 'lg:col-span-2' : 'lg:col-span-4'
          return (
            <BentoCard
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className={colSpan}
            >
              <Skeleton className="aspect-[4/3] h-full w-full" />
            </BentoCard>
          )
        })}
      </BentoGrid>
    </div>
  )
}

export { ContinentsSkeleton, ContinentsWrapper }
