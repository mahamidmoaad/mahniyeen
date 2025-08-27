// src/components/ProCard.tsx
import Link from 'next/link'
export default function ProCard({ pro }: any) {
  return (
    <div className="bg-white rounded p-4 shadow text-right">
      <div className="flex items-start gap-4">
        <img src={pro.avatar_url ?? '/favicon.ico'} className="w-16 h-16 rounded-full object-cover" alt={pro.business_name} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{pro.business_name}</div>
              <div className="text-sm text-gray-500">{pro.full_name}</div>
            </div>
            <div className="text-sm text-yellow-500">⭐ {pro.rating ?? '—'}</div>
          </div>
          <p className="mt-2 text-sm text-gray-600">{pro.bio?.slice(0,100)}</p>
          <div className="mt-3 flex gap-2">
            <Link href={`/pro/${pro.id}`} className="text-sm underline">عرض التفاصيل</Link>
            <a href={`https://wa.me/${pro.phone_number}`} className="text-sm text-green-600">واتساب</a>
          </div>
        </div>
      </div>
    </div>
  )
}
