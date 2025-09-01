import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function ProsPage() {
  const { data: pros, error } = await supabase.from("pros").select("*");

  if (error) {
    return <div className="p-4 text-red-500">خطأ أثناء جلب المحترفين</div>;
  }

  if (!pros || pros.length === 0) {
    return <div className="p-4 text-gray-500">لا يوجد محترفين مسجلين بعد</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pros.map((pro) => (
        <Link
          key={pro.id}
          href={`/pros/${pro.id}`}
          className="p-4 border rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">{pro.name}</h2>
          <p className="text-gray-600">{pro.description}</p>
        </Link>
      ))}
    </div>
  );
}
