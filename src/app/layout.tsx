// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "المهنيّين",
  description: "ابحث عن مهنيين موثوقين في بلدك",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">المهنيّين</a>
            <nav className="flex gap-4 text-sm">
              <a href="/pros" className="hover:underline">المهنيون</a>
              <a href="/request" className="hover:underline">اطلب خدمة</a>
              <a href="/dashboard/pro" className="hover:underline">لوحة المهني</a>
              <a href="/dashboard/customer" className="hover:underline">لوحة الزبون</a>
              <a href="/gps" className="hover:underline text-blue-600 font-semibold">📍 موقعك</a> {/* أضف هذا الرابط */}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        <footer className="mt-12 border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} المهنيّين
          </div>
        </footer>
      </body>
    </html>
  );
}
