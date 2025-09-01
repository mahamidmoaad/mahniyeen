import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id, pro_id, details } = body;

    const { data, error } = await supabase
      .from('orders')
      .insert([{ customer_id, pro_id, details }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
