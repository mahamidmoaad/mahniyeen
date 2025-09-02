// src/app/api/send-new-job/route.ts
import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { email, jobSummary, jobLink, to_pro } = await req.json();

    // تحزيم الرسالة لاستخدام SendGrid
    const sendgridApiKey = process.env.SENDGRID_API_KEY!;
    const fromEmail = process.env.SENDGRID_FROM || "no-reply@yourdomain.com";

    const payload = {
      personalizations: [
        {
          to: [{ email }],
          subject: "إشعار طلب جديد — المهنيين",
        },
      ],
      from: { email: fromEmail, name: "المهنيين" },
      content: [
        {
          type: "text/html",
          value: `<p>وصف الطلب: ${jobSummary}</p><p><a href="${jobLink}">عرض الطلب</a></p>`,
        },
      ],
    };

    const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      return new Response(JSON.stringify({ ok: false, error: text }), { status: 500 });
    }

    // optional: سجل الاشعار في جدول notifications
    if (to_pro) {
      await supabaseAdmin.from("notifications").insert([
        { user_id: to_pro, title: "طلب جديد", body: jobSummary, url: jobLink },
      ]);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
