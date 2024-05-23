'use client';

import { Order } from '@/types';
import { Chip } from '@nextui-org/chip';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';

export default function OrderList({ orders }: { orders: Order[] }) {
  return (
    <Table
      aria-label="Example static collection table"
      isHeaderSticky
      className="h-[80vh] w-[90vw]"
    >
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Creator</TableColumn>
        <TableColumn>Lab ID</TableColumn>
        <TableColumn>Priority</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.title}</TableCell>
            <TableCell>{order.description}</TableCell>
            <TableCell>{order.creator}</TableCell>
            <TableCell>{order.lab_id}</TableCell>
            <TableCell>{order.priority}</TableCell>
            <TableCell>
              <Chip color={order.is_completed ? 'success' : 'warning'}>
                {order.is_completed ? 'Completed' : 'Pending'}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
