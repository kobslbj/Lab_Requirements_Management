'use client';

import { useDisclosure } from '@nextui-org/use-disclosure';
import { Key, useState } from 'react';
import { Order } from '@/types';
import RowModal from './RowModal';
import OrderTable from './OrderTable';
import Filter from './Filter';

export default function TableWithModal({
  orders,
  actionType,
}: {
  orders: Order[];
  actionType: 'admin' | 'worker';
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeOrder, setActiveOrder] = useState<Order>();
  const [status, setStatus] = useState<boolean>();
  const [priority, setPriority] = useState<number>();

  const onRowAction = (id: Key) => {
    const order = orders.find((o) => o.id === id);
    setActiveOrder(order);
    onOpen();
  };

  const handleStatusChange = (newStatus: boolean | undefined) => {
    setStatus(newStatus);
  };

  const handlePriorityChange = (newPriority: number | undefined) => {
    setPriority(newPriority);
  };

  let filteredOrders = orders;

  if (status !== undefined) {
    filteredOrders = orders.filter((order) => status === order.is_completed);
  }

  if (priority !== undefined) {
    filteredOrders = filteredOrders.filter(
      (order) => order.priority === priority,
    );
  }

  return (
    <>
      <Filter
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
      />
      <OrderTable
        orders={filteredOrders}
        onRowAction={onRowAction}
        actionType={actionType}
      />
      <RowModal
        activeOrder={activeOrder}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        actionType={actionType}
      />
    </>
  );
}
