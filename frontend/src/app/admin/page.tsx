import TableWithModal from '@/components/TableWithModal';
import { Order } from '@/types';

export default async function AdminPage() {
  const res = await fetch('http://localhost:3000/mock/orders');
  const { data }: { data: Order[] } = await res.json();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">委託單列表</h1>
        </div>
        <TableWithModal orders={data} actionType="admin" />
      </div>
    </div>
  );
}
