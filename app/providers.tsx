import { FavoritesProvider } from '@/context/favorites-context'
import { verifySession } from '@/lib/dal'

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await verifySession()
  const userId = session?.userId ?? null
  return <FavoritesProvider userId={userId}>{children}</FavoritesProvider>
}
