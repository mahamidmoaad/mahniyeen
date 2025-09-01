import { supabase } from "@/lib/supabaseClient";

export default async function ProDashboardPage() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-4 text-red-500">خطأ أثناء جلب الأعمال</div>;
  }

  if (!jobs || jobs.length === 0) {
    return <div className="p-4 text-gray-500">لا يوجد أعمال حتى الآن</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">لوحة المحترف</h1>
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="font-semibold">العنوان: {job.title}</p>
            <p className="text-gray-600">الوصف: {job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
