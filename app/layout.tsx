import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import './globals.css'
import Footer from "@/app/footer/page";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web Service For Learning',
  description: 'Web Service For Learning is a web service for learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={`${inter.className}  flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}