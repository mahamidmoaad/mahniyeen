"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Pro = {
  id: string;
  full_name: string;
  bio: string | null;
  photo_url: string | null;
  rating: number | null;
  reviews_count: number | null;
  verified: boolean | null;
  city_name: string | null;
};

export default function ProsListClient() {
  const sp = useSearchParams();
  const q = sp.get("q")?.trim() || "";
  const catSlug = sp.get("cat") || ""; // لاحقاً ممكن نفلتر عبر join
  const city = sp.get("city") || "";

  const [loading, setLoading] = useState(true);
  const [pros, setPros] = useState<Pro[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);

      // قراءة من View عامة pros_public
      const { data, error } = await supabase
        .from("pros_public")
        .select("*");

      if (!isMounted) return;

      if (error) {
        console.error(error);
        setPros([]);
        setLoading(false);
        return;
      }

      let filtered = (data as Pro[]) || [];

      if (q) {
        const ql = q.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.full_name.toLowerCase().includes(ql) ||
            (p.bio || "").toLowerCase().includes(ql) ||
            (p.city_name || "").toLowerCase().includes(ql)
        );
      }

      // مبدئياً catSlug والمدينة فلترة على الواجهة (تقدر تطورها SQLياً)
      if (city) {
        const c = city.toLowerCase();
        filtered = filtered.filter((p) => (p.city_name || "").toLowerCase().includes(c));
      }

      setPros(filtered);
      setLoading(false);
    })();

    return () => { isMounted = false; };
  }, [q, city, catSlug]);

  if (loading) return <div className="card">جارِ التحميل…</div>;
  if (!pros.length) return <div className="card">لا يوجد مهنيون مطابقون حالياً.</div>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pros.map((p) => (
        <a key={p.id} href={`/pro/${p.id}`} className="card hover:shadow-md">
          <div className="flex items-center gap-3">
            <img
              src={p.photo_url || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(p.full_name)}`}
              alt={p.full_name}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">{p.full_name}</div>
              <div className="text-xs text-gray-500">{p.city_name || "غير محدد"}</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-3 line-clamp-3">{p.bio || "لا يوجد نبذة"}</div>
          <div className="text-xs text-gray-500 mt-2">
            تقييم: {p.rating ?? 0} ⭐ | مراجعات: {p.reviews_count ?? 0}
          </div>
        </a>
      ))}
    </div>
  );
}
