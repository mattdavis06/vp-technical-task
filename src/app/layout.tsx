import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-sans',
})

export const metadata: Metadata = {
  title: 'VP Technical Task',
  description: 'VP Technical Task',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className='flex h-full flex-col overflow-hidden'>
              <main className='container mx-auto flex h-full max-w-7xl flex-1 flex-col overflow-hidden px-2 py-2 md:px-4 md:py-4'>
                {children}
              </main>
            </div>
          </Providers>
          <Toaster richColors position='top-right' duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  )
}
