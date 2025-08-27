// api/sendNewJob.ts (Vercel)
import fetch from 'node-fetch';
export default async function handler(req, res){
  const {email, jobSummary} = req.body;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'no-reply@mahniyeen.com',
      to: [email],
      subject: 'طلب خدمة جديد',
      html: `<p>لديك طلب جديد: ${jobSummary}</p>`
    })
  });
  res.status(200).json({ok:true});
}
