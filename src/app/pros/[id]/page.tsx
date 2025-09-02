// src/app/pros/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProDetailsPage({ params }: PageProps) {
  const { id } = await params; // 👈 هون نستعمل await

  const { data: pro, error } = await supabase
    .from("pros")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !pro) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{pro.name}</h1>
      <p className="text-gray-700 mb-2">{pro.category}</p>
      <p className="text-gray-600">{pro.description}</p>
    </main>
  );
}
