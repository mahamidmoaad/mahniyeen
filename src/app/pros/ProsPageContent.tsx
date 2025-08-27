"use client";

import { useSearchParams } from "next/navigation";

export default function ProsPageContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "الكل";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">قائمة المهنيين</h1>
      <p className="mb-4">التصنيف الحالي: {category}</p>

      {/* هون بتحط الكود اللي بيعرض المهنيين */}
      <ul className="space-y-2">
        <li className="p-4 border rounded-lg">مثال: كهربائي</li>
        <li className="p-4 border rounded-lg">مثال: سبّاك</li>
        <li className="p-4 border rounded-lg">مثال: نجّار</li>
      </ul>
    </div>
  );
}
