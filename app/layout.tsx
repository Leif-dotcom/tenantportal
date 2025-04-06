import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tenant Portal',
  description: 'A portal for landlords and tenants',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // The language will be set by the [lang] segment, 
  // but we can't directly access it here
  // The HTML lang attribute will get updated by the middleware
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
