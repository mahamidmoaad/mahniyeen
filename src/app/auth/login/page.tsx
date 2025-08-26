'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  async function send() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMsg(error.message);
    else setMsg('تم إرسال رابط/رمز الدخول إلى بريدك.');
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">تسجيل الدخول</h1>
      <input className="w-full p-2 border mt-3" value={email} onChange={e=>setEmail(e.target.value)} placeholder="البريد الإلكتروني" />
      <button onClick={send} className="mt-3 bg-black text-white px-4 py-2 rounded">أرسل</button>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  );
}
