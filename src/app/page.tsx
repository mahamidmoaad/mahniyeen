// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="card p-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">لنوصّلك بأفضل مهنيين حولك 🔧</h1>
        <p className="text-gray-600">
          كهربائي، سباك، نجّار، دهّان.. اطلب خدمتك بثواني وخلي الباقي علينا.
        </p>
        <div className="flex gap-3">
          <Link href="/request" className="btn">اطلب خدمة الآن</Link>
          <Link href="/pros" className="btn bg-gray-900 hover:bg-black">تصفّح المهنيين</Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">تصنيفات شائعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "كهربائي", slug: "electrician" },
            { name: "سباك", slug: "plumber" },
            { name: "نجار", slug: "carpenter" },
            { name: "دهّان", slug: "painter" },
            { name: "تبريد وتكييف", slug: "hvac" },
            { name: "ألمنيوم", slug: "aluminum" },
            { name: "حداد", slug: "blacksmith" },
            { name: "بلاط", slug: "tiler" },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/pros?cat=${c.slug}`}
              className="card text-center hover:shadow-md"
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-500 mt-1">اعثر على مهنيين</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
