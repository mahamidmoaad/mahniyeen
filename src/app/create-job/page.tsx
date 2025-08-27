"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateJobPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1) إضافة الطلب في جدول jobs
    const { data, error } = await supabase
      .from("jobs")
      .insert([{ description }])
      .select();

    if (error) {
      console.error("Error inserting job:", error.message);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      const newJob = data[0];

      // 2) إرسال إيميل إشعار (مؤقتًا لبريد واحد للتجربة)
      try {
        await fetch("/api/send-new-job", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com", // 👈 غيرها لإيميلك للتجربة
            jobSummary: description,
            jobLink: `https://mahniyeen-mu.vercel.app/dashboard/jobs/${newJob.id}`,
          }),
        });
        console.log("Email notification sent!");
      } catch (err) {
        console.error("Failed to send email:", err);
      }
    }

    setDescription("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="اكتب وصف الطلب..."
        className="w-full border p-2 mb-4"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "جارٍ الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );
}
