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
}: {
  orders: Order[];
  onRowAction: (id: Key) => void;
}) {
  return (
    <Table
      aria-label="Example static collection table"
      isHeaderSticky
      className="h-[80vh]"
      onRowAction={onRowAction}
      classNames={{
        tr: 'hover:bg-[#f4f4f5] transition-all cursor-pointer',
      }}
    >
      <TableHeader>
        <TableColumn>標題</TableColumn>
        <TableColumn>品管工程師</TableColumn>
        <TableColumn>實驗室</TableColumn>
        <TableColumn>優先序</TableColumn>
        <TableColumn>狀態</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.title}</TableCell>
            <TableCell>{order.admin.name}</TableCell>
            <TableCell>{order.lab?.name}</TableCell>
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
