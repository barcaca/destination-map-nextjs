import 'server-only'

import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId && !session?.email) {
    return null
  }

  return {
    isAuth: true,
    userId: session.userId as string,
    email: session.email as string,
  }
})
