import Footer from '@/components/nav/Footer'
import Navbar from '@/components/nav/Navbar'
import { cn } from '@/utils'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.scss'

const quicksand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn('relative h-full antialiased', quicksand.className)}>
          <main className="relative flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 justify-center">{children}</div>
            <Footer />
          </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
