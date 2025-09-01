// src/app/request/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RequestPage() {
  const sp = useSearchParams();
  const proId = sp.get("pro") || "";

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    city_name: "",
    category_slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(null); setOk(null);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, pro_id: proId || null }),
      });
      if (!res.ok) throw new Error(await res.text());
      setOk("تم إرسال الطلب بنجاح! سنتواصل معك قريباً.");
      setForm({ customer_name: "", customer_phone: "", city_name: "", category_slug: "", description: "" });
    } catch (e: any) {
      setErr(e.message || "حصل خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">اطلب خدمة</h1>
      {ok && <div className="mb-3 rounded bg-green-100 p-3 text-green-800">{ok}</div>}
      {err && <div className="mb-3 rounded bg-red-100 p-3 text-red-800">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded-lg border px-3 py-2" placeholder="اسمك الكامل"
          value={form.customer_name} onChange={e=>setForm(f=>({...f, customer_name:e.target.value}))} required />
        <input className="w-full rounded-lg border px-3 py-2" placeholder="جوال/واتساب"
          value={form.customer_phone} onChange={e=>setForm(f=>({...f, customer_phone:e.target.value}))} required />
        <input className="w-full rounded-lg border px-3 py-2" placeholder="المدينة"
          value={form.city_name} onChange={e=>setForm(f=>({...f, city_name:e.target.value}))} />
        <select className="w-full rounded-lg border px-3 py-2"
          value={form.category_slug} onChange={e=>setForm(f=>({...f, category_slug:e.target.value}))}>
          <option value="">اختر التصنيف</option>
          <option value="electrician">كهربائي</option>
          <option value="plumber">سباك</option>
          <option value="carpenter">نجّار</option>
          <option value="painter">دهّان</option>
          <option value="hvac">تبريد وتكييف</option>
        </select>
        <textarea className="w-full rounded-lg border px-3 py-2 h-32" placeholder="وصف الطلب"
          value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} required />
        <button className="btn" disabled={loading}>
          {loading ? "جارٍ الإرسال..." : "إرسال الطلب"}
        </button>
      </form>
    </div>
  );
}
