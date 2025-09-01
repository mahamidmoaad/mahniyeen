// src/app/pro/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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

export default async function ProDetail({ params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from("pros_public")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return <div className="card">المهني غير موجود.</div>;
  }
  const p = data as Pro;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <img
            src={p.photo_url || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(p.full_name)}`}
            className="h-20 w-20 rounded-full object-cover"
            alt={p.full_name}
          />
          <div>
            <div className="text-2xl font-bold">{p.full_name} {p.verified ? "✅" : ""}</div>
            <div className="text-sm text-gray-500">{p.city_name || "غير محدد"}</div>
            <div className="text-sm text-gray-500">
              تقييم: {p.rating ?? 0} ⭐ | مراجعات: {p.reviews_count ?? 0}
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{p.bio || "لا توجد نبذة بعد."}</p>

        <div className="mt-6 flex gap-3">
          <Link href={`/request?pro=${p.id}`} className="btn">اطلب خدمة من هذا المهني</Link>
          <a className="btn bg-gray-900 hover:bg-black" href="/pros">رجوع للقائمة</a>
        </div>
      </div>
    </div>
  );
}
