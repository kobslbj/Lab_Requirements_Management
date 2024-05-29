import TableWithModal from '@/components/TableWithModal';
import { Order } from '@/types';
import AvatarButton from '@/components/Avatar';

export default async function AdminPage() {
  const res = await fetch('http://localhost:3000/mock/orders');
  const { data }: { data: Order[] } = await res.json();
  console.log(data)
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">委託單列表</div>
          {/* 這邊再用props傳入使用者名稱和位置，我先用假資料 */}
          <AvatarButton name="Justin" position="Lab A"/>
        </div>
        <TableWithModal orders={data} actionType="worker" />
      </div>
    </div>
  );
}
