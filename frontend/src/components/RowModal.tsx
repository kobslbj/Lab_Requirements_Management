import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Order } from '@/types';
import { Divider } from '@nextui-org/react';
import { ID, Lab, Priority, Status } from './Icons';

export default function RowModal({
  activeOrder,
  isOpen,
  onOpenChange,
}: {
  activeOrder: Order | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {activeOrder?.title}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
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
              {activeOrder?.lab?.name}
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Status />
                Status
              </div>
              <Chip
                variant="flat"
                radius="sm"
                color={activeOrder?.is_completed ? 'success' : 'primary'}
              >
                {activeOrder?.is_completed ? 'Completed' : 'Pending'}
              </Chip>
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
          <Button color="danger" radius="sm">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
