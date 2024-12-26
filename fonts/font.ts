import { Happy_Monkey, Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})
export const happy_monkey = Happy_Monkey({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-happy-monkey',
})
