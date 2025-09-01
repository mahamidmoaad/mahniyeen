import { supabase } from "@/lib/supabaseClient";

export default async function CustomerDashboardPage() {
  const { data: requests, error } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-4 text-red-500">خطأ أثناء جلب الطلبات</div>;
  }

  if (!requests || requests.length === 0) {
    return <div className="p-4 text-gray-500">لا يوجد طلبات حتى الآن</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">لوحة العميل</h1>
      <ul className="space-y-3">
        {requests.map((req) => (
          <li
            key={req.id}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="font-semibold">الخدمة: {req.service_name}</p>
            <p className="text-gray-600">الحالة: {req.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
