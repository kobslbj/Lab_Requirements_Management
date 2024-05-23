'use client';

import { useDisclosure } from '@nextui-org/use-disclosure';
import { Key, useState } from 'react';
import { Order } from '@/types';
import RowModal from './RowModal';
import OrderTable from './OrderTable';

export default function TableWithModal({ orders }: { orders: Order[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeOrder, setActiveOrder] = useState<Order | undefined>();

  const onRowAction = (id: Key) => {
    const order = orders.find((o) => o.id === id);
    setActiveOrder(order);
    onOpen();
  };

  return (
    <>
      <OrderTable orders={orders} onRowAction={onRowAction} />
      <RowModal
        activeOrder={activeOrder}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
