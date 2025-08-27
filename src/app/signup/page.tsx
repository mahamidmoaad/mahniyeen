"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("خطأ: " + error.message);
    } else {
      alert("تم إنشاء الحساب! سجل الدخول الآن.");
      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">إنشاء حساب</h1>
      <input
        type="email"
        placeholder="الإيميل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "جارٍ التسجيل..." : "سجّل"}
      </button>
    </form>
  );
}
