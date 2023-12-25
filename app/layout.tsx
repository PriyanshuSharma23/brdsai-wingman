import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'regenerator-runtime/runtime'
import './globals.css'
import './custom-progress-bar.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brdsai Wingman',
  description: 'Standaline audio recording for brdsai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
