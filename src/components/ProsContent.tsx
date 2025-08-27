// src/components/ProsContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ProCard from "@/components/ProCard"; // تأكد أن هذا الملف موجود أو غيّر الاستيراد

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams?.get("cat") ?? null;
  const q = searchParams?.get("q") ?? null;

  const [pros, setPros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        let query = supabase.from("pro_with_profile").select("*").limit(100);
        if (cat) query = query.eq("category_id", cat);
        if (q) query = query.ilike("business_name", `%${q}%`);
        const { data, error } = await query;
        if (error) {
          console.error("Supabase error:", error);
          setPros([]);
        } else {
          if (mounted) setPros(data || []);
        }
      } catch (err) {
        console.error(err);
        setPros([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [cat, q]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!pros.length) {
    return <div className="p-6">لا توجد نتائج</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pros.map((p) => (
          <ProCard key={p.id} pro={p} />
        ))}
      </div>
    </div>
  );
}
