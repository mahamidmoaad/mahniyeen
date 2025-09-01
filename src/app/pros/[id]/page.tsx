import { supabase } from "@/lib/supabaseClient";

type PageProps = {
  params: Promise<{ id: string }>; // ✅ هيك Next.js مبسوط
};

export default async function ProPage({ params }: PageProps) {
  const { id } = await params; // ✅ لازم await

  const { data: pro, error } = await supabase
    .from("pros")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !pro) {
    return <div className="p-4 text-red-500">المحترف غير موجود</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{pro.name}</h1>
      <p className="mt-2 text-gray-600">{pro.description}</p>
      {pro.phone && <p className="mt-2 text-gray-500">📞 {pro.phone}</p>}
    </div>
  );
}
