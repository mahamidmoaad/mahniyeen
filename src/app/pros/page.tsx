// src/app/pros/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProCard from '@/components/ProCard';
import { useSearchParams } from 'next/navigation';

export default function ProsList() {
  const params = useSearchParams();
  const cat = params.get('cat');
  const [pros, setPros] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      let q = supabase.from('pro_with_profile').select('*').limit(100);
      if (cat) q = q.eq('category_id', cat);
      const { data } = await q;
      setPros(data || []);
    })();
  }, [cat]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">النتائج</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {pros.map(p => <ProCard key={p.id} pro={p} />)}
      </div>
    </div>
  )
}
