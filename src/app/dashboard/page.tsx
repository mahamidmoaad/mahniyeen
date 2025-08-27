"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl">لوحة التحكم</h1>
      {user && <p>مرحباً {user.email}</p>}
      <div className="mt-4">
        <a
          href="/create-job"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          أرسل طلب جديد
        </a>
      </div>
    </div>
  );
}
