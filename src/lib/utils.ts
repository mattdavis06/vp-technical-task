import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencySymbol(currencyCode: string): string {
  const currencyMap: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
  }

  return currencyMap[currencyCode.toUpperCase()] || currencyCode
}
