// src/app/pros/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function ProsPage() {
  const { data: pros, error } = await supabase.from("pros").select("*").order("name", { ascending: true });

  if (error) {
    return <div className="p-4 text-red-500">خطأ في جلب قائمة المحترفين: {error.message}</div>;
  }
  if (!pros || pros.length === 0) {
    return <div className="p-4">لا يوجد محترفين حاليا</div>;
  }

  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pros.map((pro: any) => (
        <Link key={pro.id} href={`/pros/${pro.id}`} className="p-4 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-lg font-semibold">{pro.name}</h3>
          <p className="text-sm text-gray-600">{pro.bio || "لا وصف"}</p>
        </Link>
      ))}
    </div>
  );
}
