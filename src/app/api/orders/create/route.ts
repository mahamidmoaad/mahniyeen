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

    if (!body.customer_name || !body.customer_phone || !body.description) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!,
      { auth: { persistSession: false } }
    );

    let city_id: string | null = null;
    if (body.city_name) {
      const { data: c } = await supabase
        .from("cities")
        .select("id")
        .ilike("name_ar", body.city_name)
        .maybeSingle();
      if (c?.id) city_id = c.id as string;
    }

    let category_id: string | null = null;
    if (body.category_slug) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", body.category_slug)
        .maybeSingle();
      if (cat?.id) category_id = cat.id as string;
    }

    const { data: order, error } = await supabase
      .from("orders")
      .insert([{
        customer_id: null,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        city_id,
        category_id,
        pro_id: body.pro_id || null,
        description: body.description,
        status: "new"
      }])
      .select()
      .single();

    if (error) {
      console.error(error);
      return new NextResponse("DB insert failed", { status: 500 });
    }

    // Resend (ignore TS errors)
    if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
      try {
        // @ts-ignore
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const to = process.env.EMAIL_TO || process.env.EMAIL_FROM;

        const text = [
          "طلب جديد في موقع المهنيّين:",
          `الاسم: ${body.customer_name}`,
          `الهاتف: ${body.customer_phone}`,
          `المدينة: ${body.city_name || "غير محدد"}`,
          `التصنيف: ${body.category_slug || "غير محدد"}`,
          `الوصف: ${body.description}`,
          body.pro_id ? `مُوجّه لمهني: ${body.pro_id}` : "",
          `رقم الطلب: ${order.id}`
        ].filter(Boolean).join("\n");

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: [to!],
          subject: "طلب جديد - المهنيّين",
          text,
        });
      } catch (e) {
        console.error("Email failed:", e);
      }
    }

    return NextResponse.json({ ok: true, order_id: order.id });
  } catch (e) {
    console.error(e);
    return new NextResponse("Bad request", { status: 400 });
  }
}
