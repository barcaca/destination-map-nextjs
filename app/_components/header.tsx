import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="absolute top-0 z-50 w-full text-background">
      <div className="container mx-auto flex h-14 px-4 sm:px-6 lg:px-8">
        <nav
          className="flex w-full items-center justify-between gap-6"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-heading font-medium text-sm transition-colors hover:text-primar"
          >
            Home
          </Link>
          <p className="font-heading font-semibold text-sm md:text-base">
            Destination Map
          </p>
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="p-1 font-heading" asChild>
              <Link href="/novo-destino">
                <PlusIcon className="size-5" aria-hidden="true" /> Novo Destino
              </Link>
            </Button>
            {/* {session?.isAuth ? (
              <UserAvatar user={{ id: session.userId, email: session.email }} />
            ) : (
              <LoginForm />
            )} */}
          </div>
        </nav>
      </div>
    </header>
  )
}

export { Header }
