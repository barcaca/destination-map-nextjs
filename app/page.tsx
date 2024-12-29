import { verifySession } from '@/lib/dal'
import { Suspense } from 'react'
import { ContinentsSkeleton, ContinentsWrapper } from './_components/continents'
import {
  Recommendations,
  RecommendationsSkeleton,
} from './_components/recommendations'
import { UserPlacesWrapper } from './_components/user-places'

export default async function Home() {
  const session = await verifySession()
  return (
    <div className="bg-background text-foreground">
      <main className="space-y-16 py-16">
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations />
        </Suspense>
        {session?.isAuth && <UserPlacesWrapper userId={session.userId} />}
        <Suspense fallback={<ContinentsSkeleton />}>
          <ContinentsWrapper />
        </Suspense>
      </main>
    </div>
  )
}
