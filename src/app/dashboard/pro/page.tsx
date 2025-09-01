"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function ProDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase.from("orders").select("*").eq("role", "pro");
    setOrders(data || []);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">لوحة المهني</h1>
      <ul className="mt-4 space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="border p-2 rounded">
            {order.service} - {order.status}
            <div className="mt-2 space-x-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">قبول</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">رفض</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
