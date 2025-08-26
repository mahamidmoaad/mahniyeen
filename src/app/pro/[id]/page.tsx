'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

export default function ProPage() {
  const { id } = useParams() as { id: string };
  const [pro, setPro] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('pro_with_profile')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setPro(data);
    })();
  }, [id]);

  if (!pro) return <div className="p-6">...جارٍ التحميل</div>;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{pro.business_name}</h1>
      <p className="mt-2">{pro.bio}</p>
      <a className="inline-block mt-4 bg-black text-white rounded px-4 py-2" href={`/create-job?pro=${pro.id}`}>
        اطلب خدمة
      </a>
    </main>
  );
}
