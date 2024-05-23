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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { Button } from '@nextui-org/react';
import { Key, useState } from 'react';

export default function OrderTable({ orders }: { orders: Order[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeOrderId, setActiveOrderId] = useState<Key | null>(null);
  const activeOrder = orders.find((order) => order.id === activeOrderId);

  return (
    <>
      <Table
        aria-label="Example static collection table"
        isHeaderSticky
        className="h-[80vh]"
        onRowAction={(id) => {
          setActiveOrderId(id);
          onOpen();
        }}
        classNames={{
          tr: 'hover:bg-[#f4f4f5] transition-all cursor-pointer',
        }}
      >
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Creator</TableColumn>
          <TableColumn>Lab ID</TableColumn>
          <TableColumn>Priority</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.creator}</TableCell>
              <TableCell>{order.lab_id}</TableCell>
              <TableCell>{order.priority}</TableCell>
              <TableCell>
                <Chip
                  variant="flat"
                  radius="sm"
                  color={order.is_completed ? 'success' : 'primary'}
                >
                  {order.is_completed ? 'Completed' : 'Pending'}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {activeOrder?.title}
          </ModalHeader>
          <ModalBody>{activeOrder?.description}</ModalBody>
          <ModalFooter>
            <Button color="danger" radius="sm">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
