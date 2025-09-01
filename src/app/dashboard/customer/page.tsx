"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase.from("orders").select("*").eq("role", "customer");
    setOrders(data || []);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">لوحة الزبون</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded">طلب خدمة جديد</button>
      <ul className="mt-4 space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="border p-2 rounded">
            {order.service} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
