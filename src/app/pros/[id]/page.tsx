// src/app/pro/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";

type PageProps = {
  params: { id: string };
};

export default async function ProDetail({ params }: PageProps) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: pro } = await supabase
    .from("pros_public")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!pro) return <div>المهني غير موجود.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{pro.full_name}</h1>
      <p className="mt-2">{pro.bio}</p>
    </div>
  );
}
