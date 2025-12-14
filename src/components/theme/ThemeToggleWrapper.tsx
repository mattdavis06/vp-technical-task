'use client'

import { useTheme } from 'next-themes'
import { ThemeToggle } from './ThemeToggle'

export function ThemeToggleWrapper() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme || 'light'
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return <ThemeToggle onClick={toggleTheme} />
}
