// src/components/CategoryCard.tsx

import Link from 'next/link'
export default function CategoryCard({ cat }: any) {
  return (
    <Link href={`/pros?cat=${cat.id}`} className="block bg-white p-4 rounded shadow hover:shadow-md text-right">
      <div className="text-lg font-semibold">{cat.name_ar}</div>
      <div className="text-sm text-gray-500 mt-1">{cat.count || ''} مهني</div>
    </Link>
  )
}
