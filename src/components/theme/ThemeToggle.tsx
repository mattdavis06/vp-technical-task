'use client'

import { Lightbulb, LightbulbOff } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ThemeToggleProps {
  onClick: () => void
}

export function ThemeToggle({ onClick }: ThemeToggleProps) {
  const { theme, resolvedTheme } = useTheme()

  const currentTheme = resolvedTheme || theme

  return (
    <div
      onClick={onClick}
      className='border-accent bg-accent/10 text-accent hover:bg-accent/20 dark:border-accent dark:bg-accent/20 dark:text-accent dark:hover:bg-accent/30 flex w-fit cursor-pointer items-center gap-1 justify-self-end rounded-md border-2 p-2 shadow-lg'
      aria-label='Toggle theme'
      suppressHydrationWarning
    >
      {currentTheme === 'light' ? (
        <LightbulbOff className='size-5' />
      ) : (
        <Lightbulb className='size-5' />
      )}
      <p className='text-sm font-medium' suppressHydrationWarning>
        {currentTheme === 'light'
          ? 'Turn off the bathroom light?'
          : 'Turn on the bathroom light?'}
      </p>
    </div>
  )
}
