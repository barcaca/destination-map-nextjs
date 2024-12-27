import { Suspense } from 'react'
import { ContinentsSkeleton, ContinentsWrapper } from './_components/continents'
import {
  Recommendations,
  RecommendationsSkeleton,
} from './_components/recommendations'

export default async function Home() {
  return (
    <div className="bg-background text-foreground">
      <main className="space-y-16 py-16">
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations />
        </Suspense>
        <Suspense fallback={<ContinentsSkeleton />}>
          <ContinentsWrapper />
        </Suspense>
      </main>
    </div>
  )
}
