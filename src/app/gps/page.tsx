"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";

// إعداد Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Professional {
  id: number;
  name: string;
  profession: string;
  lat: number;
  lng: number;
  phone?: string;
}

export default function GpsPage() {
  const searchParams = useSearchParams();
  const professionFilter = searchParams.get("profession"); // المهنة المختارة من الصفحة الرئيسية

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // لازم يكون داخل useEffect حتى ما يصير hydration mismatch
    if (typeof window === "undefined") return;

    const fetchData = async () => {
      try {
        // أولاً بنحاول نجيب الموقع
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            (err) => {
              console.warn("⚠️ المستخدم رفض الموقع:", err.message);
              fetchProfessionals(); // بدون موقع
            }
          );
        } else {
          fetchProfessionals();
        }
      } catch (e) {
        console.error("❌ خطأ في الموقع:", e);
        fetchProfessionals();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchProfessionals();
    }
  }, [userLocation]);

  async function fetchProfessionals() {
    setLoading(true);
    setErrorMessage("");

    try {
      let query = supabase.from("professionals").select("*");

      // إذا المستخدم اختار مهنة من الصفحة الرئيسية
      if (professionFilter) {
        query = query.eq("profession", professionFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("❌ Supabase error:", error);
        setErrorMessage("حدث خطأ أثناء جلب البيانات من قاعدة البيانات.");
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setErrorMessage("لا يوجد مهنيون في هذه المهنة حالياً.");
        setLoading(false);
        return;
      }

      let sorted = data;

      // ترتيب حسب الموقع إن وُجد
      if (userLocation) {
        sorted = [...data].sort((a, b) => {
          const distA = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
          const distB = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
          return distA - distB;
        });
      } else {
        // ترتيب أبجدي
        sorted = [...data].sort((a, b) => a.name.localeCompare(b.name, "ar"));
      }

      setProfessionals(sorted);
    } catch (err) {
      console.error("❌ Error fetching professionals:", err);
      setErrorMessage("حدث خطأ أثناء معالجة البيانات.");
    } finally {
      setLoading(false);
    }
  }

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {professionFilter ? `المهنيون في مهنة: ${professionFilter}` : "كل المهنيين"}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>
      ) : errorMessage ? (
        <p className="text-center text-red-500">{errorMessage}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {professionals.map((pro) => (
            <div key={pro.id} className="p-4 border rounded-lg shadow bg-white">
              <h2 className="text-lg font-bold">{pro.name}</h2>
              <p className="text-gray-600">{pro.profession}</p>
              {userLocation && (
                <p className="text-sm text-gray-500 mt-2">
                  المسافة:{" "}
                  {getDistance(userLocation.lat, userLocation.lng, pro.lat, pro.lng).toFixed(1)} كم
                </p>
              )}
              {pro.phone && (
                <a
                  href={`tel:${pro.phone}`}
                  className="block mt-3 text-blue-600 hover:underline"
                >
                  📞 الاتصال بالمهني
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
