'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreateJob({ searchParams }: any) {
  const [title, setTitle] = useState('');
  const [desc, setDesc]   = useState('');
  const [city, setCity]   = useState('');
  const proId = searchParams?.pro ?? null;

  async function submit() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('سجّل الدخول أولاً'); return; }
    const uid = session.user.id;
    const { error } = await supabase.from('job_requests').insert([{
      customer_id: uid,
      title, description: desc, city,
      assigned_pro_id: proId
    }]);
    if (error) alert(error.message); else alert('تم إنشاء الطلب');
  }

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-xl font-bold">إنشاء طلب</h1>
      <input className="w-full p-2 border mt-3" placeholder="عنوان" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full p-2 border mt-3" placeholder="وصف" value={desc} onChange={e=>setDesc(e.target.value)} />
      <input className="w-full p-2 border mt-3" placeholder="المدينة" value={city} onChange={e=>setCity(e.target.value)} />
      <button onClick={submit} className="mt-4 bg-black text-white px-4 py-2 rounded">أرسل</button>
    </div>
  );
}
