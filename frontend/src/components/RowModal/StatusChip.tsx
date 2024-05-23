import { Order } from '@/types';
import { Chip } from '@nextui-org/chip';

export default function StatusChip({ order }: { order: Order }) {
  return (
    <Chip
      variant="flat"
      radius="sm"
      color={order.is_completed ? 'success' : order.lab ? 'primary' : 'default'}
    >
      {order.is_completed
        ? 'Completed'
        : order.lab
          ? 'Pending'
          : 'Not Assigned'}
    </Chip>
  );
}
