"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function GpsPageContent() {
  const searchParams = useSearchParams();
  const profession = searchParams?.get("profession") || "";
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfessionals = async () => {
      if (!profession || profession.trim() === "") {
        setErrorMessage("⚠️ لم يتم تحديد المهنة.");
        setLoading(false);
        return;
      }

      console.log("🔍 Fetching professionals for:", profession);

      const { data, error } = await supabase
        .from("professionals")
        .select("id, name, phone, profession, lat, lng")
        .ilike("profession", `%${profession.trim()}%`);

      if (error) {
        console.error("❌ Supabase error:", error);
        setErrorMessage("حدث خطأ أثناء جلب البيانات من قاعدة البيانات.");
        setLoading(false);
        return;
      }

      console.log("📦 Supabase data:", data);

      if (!data || data.length === 0) {
        setErrorMessage("لا يوجد مهنيون في هذه المهنة حالياً.");
      } else {
        setProfessionals(data);
      }

      setLoading(false);
    };

    fetchProfessionals();
  }, [profession]);

  if (loading) return <p className="text-center mt-10">جارٍ تحميل البيانات...</p>;

  if (errorMessage)
    return <p className="text-center text-gray-600 mt-8">{errorMessage}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        المهنيون في مجال "{profession}"
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {professionals.map((pro) => (
          <li key={pro.id} className="border rounded-2xl p-4 shadow-sm bg-white">
            <h2 className="font-semibold text-lg">{pro.name}</h2>
            <p className="text-sm text-gray-600">{pro.profession}</p>
            <p className="text-sm text-gray-800 mt-1">📞 {pro.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GpsPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">جاري التحميل...</p>}>
      <GpsPageContent />
    </Suspense>
  );
}
