"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ProsContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">قائمة المهنيين</h1>
      <p className="mb-2">كلمة البحث: {q ?? "لم يتم إدخال كلمات"}</p>

      {/* هون بتحط باقي الكومبوننت تاعت عرض المهنيين */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">مهني 1</div>
        <div className="p-4 border rounded shadow">مهني 2</div>
        <div className="p-4 border rounded shadow">مهني 3</div>
      </div>
    </div>
  );
}

export default function ProsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">جاري تحميل المهنيين...</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      }
    >
      <ProsContent />
    </Suspense>
  );
}
