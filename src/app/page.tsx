// src/app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';

export default function Home() {
  const [cats, setCats] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('categories').select('*').order('name_ar');
      setCats(data || []);
    })();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">ابحث عن مهنيين بالقرب منك</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {cats.map(c => <CategoryCard key={c.id} cat={c} />)}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">الأكثر طلبًا</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/pros" className="p-6 bg-white rounded shadow text-right">كل الخدمات</Link>
        </div>
      </div>
    </div>
  )
}
