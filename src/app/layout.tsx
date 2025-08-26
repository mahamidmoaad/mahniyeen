import './globals.css';
import { Tajawal } from 'next/font/google';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '700'], // اختر الأوزان اللي بدك إياها
});

export const metadata = { title: 'المهنيين' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
