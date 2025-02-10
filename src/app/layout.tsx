import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: 'Michael Bekele - UX/UI Designer & Developer Resume',
  description: 'Strategic UX/UI Design Lead with 5+ years of experience in federal digital solutions, Section 508/WCAG compliance, and cross-functional leadership.',
  openGraph: {
    title: 'Michael Bekele - UX/UI Designer & Developer Resume',
    description: 'Strategic UX/UI Design Lead with 5+ years of experience in federal digital solutions, Section 508/WCAG compliance, and cross-functional leadership.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/resume`,
    siteName: 'Michael Bekele',
    type: 'profile',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Bekele - UX/UI Designer & Developer Resume',
    description: 'Strategic UX/UI Design Lead with 5+ years of experience in federal digital solutions, Section 508/WCAG compliance, and cross-functional leadership.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/resume`,
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
