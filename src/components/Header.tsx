// src/components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <Link href="/" className="text-2xl font-bold">المهنيين</Link>

        <div className="flex items-center gap-4">
          <Link href="/create-job" className="hidden md:inline-block bg-black text-white px-4 py-2 rounded">أرسل طلب</Link>
          <Link href="/login" className="text-sm">تسجيل / دخول</Link>
        </div>
        <Link href="/mahniyeen-table">الجدول</Link>
        <Link href="/gps">GPS</Link>
      </div>
    </header>
  )
}
