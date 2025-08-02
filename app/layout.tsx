import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ADmyBRAND Analytics Dashboard',
  description: 'Real-time analytics and insights dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
