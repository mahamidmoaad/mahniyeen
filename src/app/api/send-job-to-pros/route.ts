// src/app/api/send-job-to-pros/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@mahniyeen-mu.vercel.app';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req: Request) {
  try {
    const { jobId } = await req.json();

    // 1) جلب بيانات الـ job
    const { data: jobData, error: jobErr } = await supabase
      .from('job_requests')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobErr || !jobData) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    // 2) جلب المهنيين المطابقين (حسب category_id و/أو المدينة)
    const { data: pros, error: prosErr } = await supabase
      .from('pro_with_profile')
      .select('*')
      .eq('category_id', jobData.category_id)
      .limit(100);

    if (prosErr) return NextResponse.json({ error: 'Failed to fetch pros' }, { status: 500 });

    // 3) إرسال رسائل بريد لكل محترف (بـ Resend)
    const sendResults: any[] = [];
    for (const p of pros || []) {
      if (!p.email && !p.phone_number && !p.full_name) {
        // تخطّى إن لم يكن لديه بريد
        continue;
      }
      const recipientEmail = p.email || p.email_address || p.profile_email || p.phone_number + '@example.invalid';
      // نص الرسالة (يمكن تخصيصه أكثر)
      const html = `
        <p>مرحبًا ${p.full_name || 'زميل محترف'},</p>
        <p>وردنا طلب خدمة جديد: <strong>${jobData.title || 'طلب جديد'}</strong></p>
        <p>تفاصيل: ${jobData.description || ''}</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/jobs/${jobId}">عرض الطلب</a></p>
      `;
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: EMAIL_FROM,
            to: [recipientEmail],
            subject: `طلب خدمة جديد في ${jobData.city || 'منطقتك'}`,
            html,
          }),
        });
        const body = await res.json();
        sendResults.push({ to: recipientEmail, ok: res.ok, body });
      } catch (err: any) {
        sendResults.push({ to: recipientEmail, ok: false, error: err.message });
      }
    }

    return NextResponse.json({ ok: true, sent: sendResults });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
