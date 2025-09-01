// src/lib/api.ts
export type Pro = {
    id: string
    name: string
    description: string
  }
  
  // دالة وهمية لإرجاع بيانات برو حسب الـ id
  export async function getProById(id: string): Promise<Pro> {
    // مثال: بيانات ثابتة لتجاوز أخطاء TypeScript
    return {
      id,
      name: `Pro ${id}`,
      description: `Description for Pro ${id}`,
    }
  }
  