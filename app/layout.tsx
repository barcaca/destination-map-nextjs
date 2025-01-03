import { Toaster } from '@/components/ui/sonner'
import { happy_monkey, montserrat } from '@/fonts/font'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { HeroCarrousel } from './_components/hero-carrousel'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    template: '%s | Destination Map',
    default: 'Destination Map - Explore os Melhores Destinos',
  },
  description:
    'Descubra e planeje suas próximas aventuras com o Destination Map. Explore destinos incríveis, compartilhe experiências e crie memórias inesquecíveis.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${happy_monkey.variable} ${montserrat.variable} h-full scroll-smooth`}
    >
      <body className="flex h-full min-h-screen w-full flex-col">
        <Providers>
          <Header />
          <HeroCarrousel />
          {children}
          <Footer />
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
