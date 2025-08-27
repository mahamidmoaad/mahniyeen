"use client";

import { useSearchParams } from "next/navigation";

export default function ProsContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">قائمة المهنيين</h1>
      <p className="mb-2">كلمة البحث: {q ?? "لم يتم إدخال كلمات"}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">مهني 1</div>
        <div className="p-4 border rounded shadow">مهني 2</div>
        <div className="p-4 border rounded shadow">مهني 3</div>
      </div>
    </div>
  );
}
