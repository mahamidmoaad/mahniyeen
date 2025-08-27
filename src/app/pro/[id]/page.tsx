// src/app/pro/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ProPage() {
  const { id } = useParams() as { id: string };
  const [pro, setPro] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('pro_with_profile').select('*').eq('id', id).single();
      setPro(data);
    })();
  }, [id]);

  if (!pro) return <div className="p-4">جارٍ التحميل...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow text-right">
        <div className="flex items-center gap-6">
          <img src={pro.avatar_url ?? '/favicon.ico'} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div>
            <h1 className="text-2xl font-bold">{pro.business_name}</h1>
            <div className="text-sm text-gray-600">{pro.full_name} — {pro.profile_city}</div>
            <div className="mt-2">⭐ {pro.rating || '—'}</div>
            <div className="mt-3">{pro.bio}</div>
            <div className="mt-4 flex gap-2">
              <a href={`https://wa.me/${pro.phone_number}`} className="bg-green-600 px-3 py-2 rounded text-white">واتساب</a>
              <a href={`tel:${pro.phone_number}`} className="bg-black px-3 py-2 rounded text-white">اتصل</a>
              <a href={`/create-job?pro=${pro.id}`} className="bg-blue-600 px-3 py-2 rounded text-white">اطلب خدمة</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">معرض الأعمال</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {/* لو عندك صور: pro.portfolio_urls */}
          {(pro.portfolio_urls || []).map((u:string,i:number)=>(<img key={i} src={u} className="w-full h-40 object-cover rounded" />))}
        </div>
      </div>

    </div>
  )
}
