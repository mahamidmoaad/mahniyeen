import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, jobSummary, jobLink } = await req.json();
    const API_KEY = process.env.RESEND_API_KEY;
    if (!API_KEY) return NextResponse.json({ error: 'No RESEND_API_KEY' }, { status: 500 });

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'no-reply@mahniyeen-mu.vercel.app',
        to: [email],
        subject: `طلب خدمة جديد`,
        html: `<p>لديك طلب جديد:</p><p>${jobSummary}</p><p><a href="${jobLink}">عرض الطلب</a></p>`,
      }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: 500 });
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
