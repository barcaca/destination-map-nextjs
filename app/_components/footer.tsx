import { Icons } from '@/components/icons'
import Link from 'next/link'

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/barcaca',
    icon: <Icons.gitHub className="size-6 " aria-hidden="true" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/luan-barcaça/',
    icon: <Icons.linkedin className="size-6" aria-hidden="true" />,
  },
]

const Footer = () => {
  return (
    <footer className="relative flex min-h-96 w-full items-end border-t bg-background">
      <div
        className='absolute inset-0 bg-[url("/ibrahim-rifath-unsplash.jpg?height=390&width=1920")] bg-center bg-cover'
        aria-hidden="true"
      />
      <div className="w-full border-t bg-black/15 backdrop-blur-[3px]">
        <div className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between text-center md:flex-row ">
            <div className="flex space-x-4" aria-label="Social media links">
              {socials.map(social => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md p-1 text-background transition-colors hover:bg-background/20 [&_svg]:shrink-0"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
            <p className="p-4 text-background text-sm">
              &copy; {new Date().getFullYear()} Destination Map. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
