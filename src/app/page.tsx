'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [cats, setCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name_ar', { ascending: true });
      if (!error) setCats(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">المهنيين</h1>
      {loading && <div>...جارٍ التحميل</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map((c) => (
          <a key={c.id} href={`/pros?cat=${c.id}`} className="p-4 bg-white rounded shadow hover:shadow-md">
            <div className="text-lg">{c.name_ar}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
