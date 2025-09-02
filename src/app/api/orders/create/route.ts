// src/app/api/orders/create/route.ts
import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, pro_id, category_id, title, description, address, budget } = body;

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .insert([{ user_id, pro_id, category_id, title, description, address, budget }])
      .select()
      .single();

    if (error) throw error;

    // بعد الإنشاء يمكنك استدعاء خدمة إرسال إيميل أو إشعار:
    // await fetch('/api/send-new-job', { method: 'POST', body: JSON.stringify({ email, jobSummary, jobLink, to_pro: pro_id }) });

    return new Response(JSON.stringify({ ok: true, job: data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
