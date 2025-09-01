// src/app/dashboard/customer/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Order = {
  id: string; description: string; status: string; created_at: string;
};

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data } = await supabase
        .from("orders")
        .select("id, description, status, created_at")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      setOrders((data as any) || []);
    })();
  }, []);

  if (!userId) {
    return <div className="card">الرجاء تسجيل الدخول لعرض طلباتك.</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">طلباتك</h1>
      {!orders.length ? (
        <div className="card">لا توجد طلبات بعد.</div>
      ) : (
        <div className="grid gap-3">
          {orders.map(o => (
            <div key={o.id} className="card">
              <div className="text-sm text-gray-500">{new Date(o.created_at).toLocaleString()}</div>
              <div className="font-semibold mt-1">{o.description}</div>
              <div className="text-xs text-gray-500 mt-1">الحالة: {o.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
