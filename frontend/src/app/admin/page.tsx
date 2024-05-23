import OrderCreator from '@/components/OrderCreator';
import OrderTable from '@/components/OrderTable';
import { Order } from '@/types';

export default async function AdminPage() {
  const res = await fetch('http://localhost:3000/mock/orders');
  const { data }: { data: Order[] } = await res.json();

  return (
    <div className="flex h-screen flex-col items-center justify-center p-10">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Orders</h1>
          <OrderCreator />
        </div>
        <OrderTable orders={data} />
      </div>
    </div>
  );
}
