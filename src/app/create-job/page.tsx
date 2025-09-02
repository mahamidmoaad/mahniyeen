// src/app/create-job/page.tsx
"use client";

import { useState } from "react";

export default function CreateJobForm() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // user_id: (if logged in),
          title: "طلب جديد",
          description,
          // pro_id: optional
        }),
      });
      const j = await resp.json();
      if (!j.ok) throw new Error(j.error || "حدث خطأ");
      // إرسال إشعار إيميل (خيار)
      await fetch("/api/send-new-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@yourmail.com",
          jobSummary: description,
          jobLink: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/jobs/${j.job.id}`,
        }),
      });
      alert("تم إنشاء الطلب بنجاح");
      setDescription("");
    } catch (err: any) {
      alert("خطأ: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl">
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border mb-3" placeholder="وصف الطلب..." />
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "جارٍ..." : "أرسل الطلب"}
      </button>
    </form>
  );
}
