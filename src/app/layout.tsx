// src/app/layout.tsx
import './globals.css'
import { Tajawal } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'المهنيين',
  description: 'دليل المهنيين المحلي - البحث والحجز بسهولة',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
