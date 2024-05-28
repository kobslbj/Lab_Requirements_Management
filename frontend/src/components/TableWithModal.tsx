'use client';

import { useDisclosure } from '@nextui-org/use-disclosure';
import { Key, useState, useEffect } from 'react';
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
  const [activeOrder, setActiveOrder] = useState<Order | undefined>();
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [status, setStatus] = useState<number | undefined>(0);
  const [priority, setPriority] = useState<number | undefined>(0);

  const onRowAction = (id: Key) => {
    const order = orders.find((o) => o.id === id);
    setActiveOrder(order);
    onOpen();
  };

  const handleStatusChange = (newStatus: number | undefined) => {
    setStatus(newStatus);
  };

  const handlePriorityChange = (newPriority: number | undefined) => {
    setPriority(newPriority);
  };

  useEffect(() => {
    filterOrders(status, priority);
  }, [status, priority, orders]);

  const filterOrders = (
    status: number | undefined,
    priority: number | undefined,
  ) => {
    let newOrders = orders;

    if (status !== undefined && status !== 0) {
      newOrders = newOrders.filter((order) =>
        status === 2 ? order.is_completed : !order.is_completed,
      );
    }

    if (priority !== undefined && priority !== 0) {
      newOrders = newOrders.filter((order) => order.priority === priority);
    }
    setFilteredOrders(newOrders);
  };

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
