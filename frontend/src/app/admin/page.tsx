import TableWithModal from '@/components/TableWithModal';
import AvatarButton from '@/components/Avatar';
import { Order } from '@/types';

export default async function AdminPage() {
  const res = await fetch('http://localhost:3000/mock/orders');
  const { data }: { data: Order[] } = await res.json();
  console.log(data);
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">委託單列表</div>
          <div className="flex gap-5">
            <OrderCreator />
            <AvatarButton name="Justin" position="Lab A" />
          </div>
        </div>
        <TableWithModal orders={data} actionType="admin" />
      </div>
    </div>
  );
}
