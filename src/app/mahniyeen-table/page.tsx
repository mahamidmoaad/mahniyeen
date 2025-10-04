'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function MahniyeenTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('professionals').select('*');
      if (error) console.error(error);
      else setData(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">جدول المهنيين</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">الاسم</th>
            <th className="border px-4 py-2">المهنة</th>
            <th className="border px-4 py-2">الموقع</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.job}</td>
              <td className="border px-4 py-2">{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
