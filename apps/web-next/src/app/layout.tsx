import type { Metadata } from 'next'
import { Arimo, Inter, Roboto } from 'next/font/google'
import './globals.css'
import AppProviders from '@/providers/AppProviders'

const arimo = Arimo({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-arimo',
})

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'BankIM Online',
  description: 'Israeli banking services with multi-language support',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" className={`${arimo.variable} ${roboto.variable} ${inter.variable}`}>
      <body className="bg-base-primary text-textTheme-primary font-he">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
