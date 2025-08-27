"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProDashboard() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      setUser(user);

      // المهني يشوف كل الطلبات
      const { data } = await supabase.from("jobs").select("*");
      setJobs(data || []);
    };
    fetchData();
  }, [router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl">لوحة المهني</h1>
      <h2 className="mt-6 text-xl">جميع الطلبات</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="border p-2 my-2">
            {job.description}
            <button className="bg-green-600 text-white px-2 py-1 ml-2 rounded">
              قدّم عرض
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
