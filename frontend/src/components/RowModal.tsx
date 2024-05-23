import { Button } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Order } from '@/types';

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
        <ModalBody>{activeOrder?.description}</ModalBody>
        <ModalFooter>
          <Button color="danger" radius="sm">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
