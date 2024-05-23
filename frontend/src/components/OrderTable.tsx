'use client';

import { Order } from '@/types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { useState } from 'react';
import RowModal from './RowModal';
import StatusChip from './RowModal/StatusChip';

export default function OrderTable({ orders }: { orders: Order[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeOrder, setActiveOrder] = useState<Order | undefined>();

  return (
    <>
      <Table
        aria-label="Example static collection table"
        isHeaderSticky
        className="h-[80vh]"
        onRowAction={(id) => {
          const order = orders.find((o) => o.id === id);
          setActiveOrder(order);
          onOpen();
        }}
        classNames={{
          tr: 'hover:bg-[#f4f4f5] transition-all cursor-pointer',
        }}
      >
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Admin</TableColumn>
          <TableColumn>Lab</TableColumn>
          <TableColumn>Priority</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.admin.name}</TableCell>
              <TableCell>{order.lab?.name}</TableCell>
              <TableCell>{order.priority}</TableCell>
              <TableCell>
                <StatusChip order={order} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RowModal
        activeOrder={activeOrder}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
