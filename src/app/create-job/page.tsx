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

      // بعد حصول newJob
    try {
      await fetch('/api/send-job-to-pros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: newJob.id }),
      });
    } catch (err) {
      console.error('notify pros failed', err);
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
