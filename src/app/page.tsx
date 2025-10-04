"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function HomePage() {
  const [professions, setProfessions] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProfessions = async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("profession");

      if (error) console.error("❌ Error:", error);
      else {
        // نستخرج المهن بدون تكرار
        const unique = Array.from(new Set(data.map((p) => p.profession))).filter(
          Boolean
        );
        setProfessions(unique);
      }
    };
    fetchProfessions();
  }, []);

  // تصفية حسب البحث
  const filtered = professions.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">اختر مهنتك 🔧</h1>

      <input
        type="text"
        placeholder="ابحث عن مهنة..."
        className="w-full border rounded-lg px-4 py-2 mb-6 text-right"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">لا توجد نتائج.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((profession) => (
            <Link
              key={profession}
              href={`/gps?profession=${encodeURIComponent(profession)}`}
              className="p-4 border rounded-lg bg-white hover:bg-gray-50 shadow-sm text-right font-semibold"
            >
              {profession}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
