import { supabase } from '../../../lib/supabaseClient';

export default async function ProDashboard() {
  const { data: orders, error } = await supabase.from('orders').select('*');

  if (error) {
    return <div className="p-4 text-red-500">خطأ: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">لوحة المهني</h1>
      <ul className="mt-4">
        {orders?.map((order) => (
          <li key={order.id} className="border p-2 mb-2 rounded">
            {order.details}
          </li>
        ))}
      </ul>
    </div>
  );
}
