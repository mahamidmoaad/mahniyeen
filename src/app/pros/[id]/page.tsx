// src/app/pros/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";

export default async function ProPage({ params }: { params: { id: string } }) {
  // إذا واجهت خطأ typing مع Next15 غيّر التوقيع إلى:
  // export default async function ProPage({ params }: { params: Promise<{id:string}> }) { const { id } = await params; ... }
  const id = (params as any).id;

  const { data: pro, error } = await supabase.from("pros").select("*").eq("id", id).single();

  if (error || !pro) {
    return <div className="p-4 text-red-500">المحترف غير موجود</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{pro.name}</h1>
      <p className="mt-2 text-gray-600">{pro.bio}</p>
      <p className="mt-2">📞 {pro.phone}</p>
    </div>
  );
}
