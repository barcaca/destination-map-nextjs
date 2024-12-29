'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { customToast } from '@/lib/custom-toast'
import { HeartIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { logoutAction } from '../_actions/login'

export type User = {
  id: string
  email: string
  favorites_id: string
}

interface UserAvatarProps {
  user: Pick<User, 'id' | 'email'>
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const [formState, formAction, isPending] = useActionState(
    logoutAction,
    undefined
  )

  useEffect(() => {
    if (formState) {
      customToast(formState)
    }
  }, [formState])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background text-foreground shadow-md">
          <span className="sr-only">User settings</span>
          {user.email?.slice(0, 1).toUpperCase()}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center justify-start gap-2 p-2">
          {user.email && (
            <p className="w-[200px] truncate text-sm text-zinc-700">
              {user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/favorites">
            <HeartIcon />
            Favoritos
          </Link>
        </DropdownMenuItem>
        <form action={formAction}>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <button type="submit" disabled={isPending}>
              <LogOutIcon />
              Sair
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserAvatar }
