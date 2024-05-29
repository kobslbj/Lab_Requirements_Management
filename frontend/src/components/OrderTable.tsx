import { Key } from 'react';
import { Order } from '@/types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import StatusChip from './RowModal/StatusChip';
import PriorityChip from './RowModal/PriorityChip';

export default function OrderTable({
  orders,
  onRowAction,
  actionType,
}: {
  orders: Order[];
  onRowAction: (id: Key) => void;
  actionType: 'admin' | 'worker';
}) {
  return (
    <Table
      aria-label="Example static collection table"
      isHeaderSticky
      className="h-[70vh]"
      onRowAction={onRowAction}
      classNames={{
        base: 'w-[60vw]',
        tr: 'hover:bg-[#f4f4f5] transition-all cursor-pointer',
      }}
    >
      <TableHeader>
        <TableColumn>標題</TableColumn>
        <TableColumn>品管工程師</TableColumn>
        {actionType === 'admin' ? (
          <TableColumn>實驗室</TableColumn>
        ) : (
          <TableColumn>廠區</TableColumn>
        )}
        <TableColumn>優先序</TableColumn>
        <TableColumn>狀態</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} onClick={() => onRowAction(order.id)}>
            <TableCell>{order.title}</TableCell>
            <TableCell>{order.creator}</TableCell>
            {actionType === 'admin' ? (
              <TableCell>{order.lab_name}</TableCell>
            ) : (
              <TableCell>{order.fab_name}</TableCell>
            )}
            <TableCell>
              <PriorityChip order={order} />
            </TableCell>
            <TableCell>
              <StatusChip order={order} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
