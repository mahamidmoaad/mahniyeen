import { Suspense } from "react";
import ProsContent from "@/components/ProsContent";

// 🚨 لازم نوقف الـ prerender
export const dynamic = "force-dynamic";

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
