// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

interface Professional {
  id: number;
  name: string;
  profession: string;
  phone: string;
}

export default function HomePage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("id, name, phone, profession");

      if (error) console.error("❌ Error fetching data:", error);
      else setProfessionals(data || []);

      setLoading(false);
    };

    fetchProfessionals();
  }, []);

  return (
    <div className="space-y-10">
      <section className="card p-8 flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold">لنوصّلك بأفضل مهنيين حولك 🔧</h1>
        <p className="text-gray-600">
          كهربائي، سباك، نجّار، دهّان.. اطلب خدمتك بثواني وخلي الباقي علينا.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/request" className="btn">
            اطلب خدمة الآن
          </Link>
          <Link href="/pros" className="btn bg-gray-900 hover:bg-black">
            تصفّح المهنيين
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-right">المهنيون</h2>

        {loading ? (
          <div className="text-center text-gray-500">جاري تحميل المهنيين...</div>
        ) : professionals.length === 0 ? (
          <div className="text-center text-gray-500">لا يوجد مهنيين حالياً.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {professionals.map((pro) => (
              <div
                key={pro.id}
                className="p-4 bg-white rounded shadow hover:shadow-md transition text-right"
              >
                <div className="font-bold text-lg">{pro.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  المهنة: {pro.profession}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  الهاتف: {pro.phone}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
