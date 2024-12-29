import { Suspense } from 'react'
import { PlaceItem, PlaceItemSkeleton } from './_components/place-item'

export default async function DestinoPage({
  params,
}: { params: Promise<{ destinoId: string }> }) {
  const { destinoId } = await params
  return (
    <main className="pt-14">
      <Suspense fallback={<PlaceItemSkeleton />}>
        <PlaceItem destinoId={destinoId} />
      </Suspense>
    </main>
  )
}
