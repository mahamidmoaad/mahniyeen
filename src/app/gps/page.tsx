'use client';
import { useEffect, useState } from 'react';

export default function GPSPage() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.error(err)
    );
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">موقعي الحالي</h1>
      {location ? (
        <p>الإحداثيات: {location.lat}, {location.lon}</p>
      ) : (
        <p>جاري تحديد موقعك...</p>
      )}
    </div>
  );
}
