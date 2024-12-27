import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUniqueRandomNumbers(
  count: number,
  max: number
): number[] {
  if (count <= 0 || max <= 0 || count > max) {
    throw new Error(
      "Parâmetros inválidos: 'count' deve ser positivo e menor ou igual a 'max'."
    )
  }

  const numbers: Set<number> = new Set<number>([])

  while (numbers.size < count) {
    const randomNumber = Math.floor(Math.random() * max)
    numbers.add(randomNumber)
  }

  return Array.from(numbers)
}
