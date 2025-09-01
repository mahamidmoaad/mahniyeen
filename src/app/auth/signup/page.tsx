"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("تم إنشاء الحساب بنجاح، يرجى التحقق من بريدك الإلكتروني");
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-2xl font-bold">إنشاء حساب جديد</h2>
        {error && <p className="mb-2 text-red-500">{error}</p>}
        {success && <p className="mb-2 text-green-500">{success}</p>}

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-md border p-2"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full rounded-md border p-2"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
        >
          تسجيل
        </button>
      </form>
    </div>
  );
}
