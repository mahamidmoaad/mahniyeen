"use client";

import { useSearchParams } from "next/navigation";

export default function ProsPageContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  return (
    <div>
      <h1>المهنيين</h1>
      <p>التصنيف الحالي: {category}</p>
      {/* بقية الكومبوننت اللي عندك */}
    </div>
  );
}
