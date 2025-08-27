"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      setUser(user);

      // استرجاع الطلبات الخاصة بالمستخدم
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("customer_id", user.id);
      setJobs(data || []);
    };
    fetchData();
  }, [router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl">لوحة الزبون</h1>
      <a href="/create-job" className="bg-blue-600 text-white px-4 py-2 rounded">أرسل طلب جديد</a>
      <h2 className="mt-6 text-xl">طلباتي</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="border p-2 my-2">
            {job.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
