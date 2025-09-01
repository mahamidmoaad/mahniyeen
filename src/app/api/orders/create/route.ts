// src/app/api/orders/create/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Body = {
  customer_name: string;
  customer_phone: string;
  city_name?: string;
  category_slug?: string;
  description: string;
  pro_id?: string | null;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );

    const { data: order } = await supabase
      .from("orders")
      .insert([{
        customer_id: null,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        description: body.description,
        status: "new"
      }])
      .select()
      .single();

    // إرسال بريد إلكتروني باستخدام dynamic import
    if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
      try {
        // @ts-ignore
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: process.env.EMAIL_TO || process.env.EMAIL_FROM!,
          subject: "طلب جديد",
          text: `تم إنشاء طلب جديد بالرقم: ${order?.id}`
        });
      } catch (e) {
        console.error("Email failed:", e);
      }
    }

    return NextResponse.json({ ok: true, order_id: order?.id });
  } catch (e) {
    return new NextResponse("Bad request", { status: 400 });
  }
}
