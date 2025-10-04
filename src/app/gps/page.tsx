"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

interface Professional {
  id: number;
  name: string;
  phone: string;
  profession: string;
  latitude: number | null;
  longitude: number | null;
}

function GPSPageContent() {
  const searchParams = useSearchParams();
  const profession = searchParams.get("profession");

  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    const fetchProfessionals = async () => {
      if (!profession) return;

      const { data, error } = await supabase
        .from("professionals")
        .select("id, name, phone, profession, latitude, longitude")
        .ilike("profession", `%${profession.trim()}%`);

      if (error) console.error("❌ Supabase error:", error);
      setProfessionals(data || []);
      setLoading(false);
    };

    fetchProfessionals();
  }, [profession]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("⚠️ المتصفح لا يدعم GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLocationEnabled(true);
      },
      () => setLocationEnabled(false)
    );
  }, []);

  const calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const sortedProfessionals = (() => {
    if (locationEnabled && userLocation) {
      return [...professionals].sort((a, b) => {
        if (!a.latitude || !a.longitude) return 1;
        if (!b.latitude || !b.longitude) return -1;
        const distA = calcDistance(userLocation.lat, userLocation.lon, a.latitude, a.longitude);
        const distB = calcDistance(userLocation.lat, userLocation.lon, b.latitude, b.longitude);
        return distA - distB;
      });
    } else {
      return [...professionals].sort((a, b) => a.name.localeCompare(b.name, "ar"));
    }
  })();

  if (loading) return <div className="text-center py-10">جاري تحميل البيانات...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-right">
      <h1 className="text-2xl font-bold mb-4">المهنيون في مهنة: {profession}</h1>

      {!locationEnabled && (
        <div className="text-sm text-gray-500 mb-4">
          ⚠️ لم يتم تفعيل الموقع الجغرافي، الترتيب حسب الاسم.
        </div>
      )}

      {sortedProfessionals.length === 0 ? (
        <div className="text-center text-gray-500">لا يوجد مهنيون في هذه المهنة حالياً.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedProfessionals.map((pro) => {
            const distance =
              userLocation && pro.latitude && pro.longitude
                ? calcDistance(userLocation.lat, userLocation.lon, pro.latitude, pro.longitude).toFixed(2)
                : null;

            return (
              <div
                key={pro.id}
                className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="font-bold text-lg">{pro.name}</div>
                <div className="text-sm text-gray-600">📞 {pro.phone}</div>
                <div className="text-sm text-gray-500 mt-1">🛠️ {pro.profession}</div>

                {distance && (
                  <div className="text-sm text-gray-500 mt-1">
                    📍 يبعد حوالي {distance} كم
                  </div>
                )}

                {pro.latitude && pro.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${pro.latitude},${pro.longitude}`}
                    target="_blank"
                    className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                  >
                    🗺️ عرض على الخريطة
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function GPSPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">جاري تحميل الصفحة...</div>}>
      <GPSPageContent />
    </Suspense>
  );
}
