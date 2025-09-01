"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function RequestPageContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">طلب جديد</h1>
      {service ? (
        <p className="mt-2 text-gray-600">الخدمة المطلوبة: {service}</p>
      ) : (
        <p className="mt-2 text-gray-500">اختر خدمة للمتابعة</p>
      )}
    </div>
  );
}

export default function RequestPage() {
  return (
    <Suspense fallback={<div className="p-6">جار التحميل...</div>}>
      <RequestPageContent />
    </Suspense>
  );
}
