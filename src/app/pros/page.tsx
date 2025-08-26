'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProsList({ searchParams }: any) {
  const cat = searchParams?.cat || null;
  const [pros, setPros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let q = supabase.from('pro_with_profile').select('*').limit(60);
      if (cat) q = q.eq('category_id', cat);
      const { data, error } = await q;
      if (!error) setPros(data || []);
      setLoading(false);
    })();
  }, [cat]);

  return (
    <main className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">المهنيون</h2>
      {loading && <div>...جارٍ التحميل</div>}
      <div className="grid md:grid-cols-3 gap-4">
        {pros.map((p) => (
          <div key={p.id} className="bg-white rounded p-4 shadow">
            <div className="flex items-center gap-3">
              <img src={p.avatar_url ?? '/favicon.ico'} className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-semibold">{p.business_name}</div>
                <div className="text-sm text-gray-500">{p.full_name}</div>
              </div>
            </div>
            <p className="mt-2 text-sm">{p.bio}</p>
            <a className="text-blue-600 underline mt-3 inline-block" href={`/pro/${p.id}`}>عرض التفاصيل</a>
          </div>
        ))}
      </div>
    </main>
  );
}
