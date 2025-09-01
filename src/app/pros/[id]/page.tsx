// src/app/pros/[id]/page.tsx
import React from "react";
import { createClient } from "@supabase/supabase-js";

interface PageParams {
  id: string;
}

// Server Component
export default async function ProPage({ params }: { params: PageParams }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: pro, error } = await supabase
    .from("pros_public")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error) return <div>حدث خطأ: {error.message}</div>;
  if (!pro) return <div>المهني غير موجود.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{pro.full_name}</h1>
      <p className="text-gray-700">{pro.bio}</p>
      <p className="mt-2 text-sm text-gray-500">البريد الإلكتروني: {pro.email}</p>
    </div>
  );
}
