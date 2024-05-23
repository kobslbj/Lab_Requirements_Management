import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Order } from '@/types';
import { Divider } from '@nextui-org/react';
import { ID, Lab, Priority, Status } from '../Icons';
import StatusChip from './StatusChip';

export default function RowModal({
  activeOrder,
  isOpen,
  onOpenChange,
}: {
  activeOrder: Order | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!activeOrder) return null;

  return (
    <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-xl">
          {activeOrder?.title}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <ID />
                Order ID
              </div>
              <div>{activeOrder?.id}</div>
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Lab />
                Lab
              </div>
              {activeOrder?.lab?.name ?? 'Empty'}
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Status />
                Status
              </div>
              <StatusChip order={activeOrder} />
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Priority />
                Priority
              </div>
              {activeOrder?.priority}
            </div>
          </div>
          <Divider />
          {activeOrder?.description}
        </ModalBody>
        <ModalFooter>
          <Button radius="sm" className="bg-black text-white">
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
