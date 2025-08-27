// src/app/pros/page.tsx
import { Suspense } from "react";
import ProsContent from "@/components/ProsContent";

// مهم جداً: اجبار الصفحة على أن تكون dynamic (لا يتم prerender)
export const dynamic = "force-dynamic";

export default function ProsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">جاري تحميل النتائج...</h1>
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
