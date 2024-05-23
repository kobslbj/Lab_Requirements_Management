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
import { Fab, ID, Lab, Priority, Status } from '../Icons';
import StatusChip from './StatusChip';
import PriorityChip from './PriorityChip';

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
        <ModalHeader className="text-xl">{activeOrder?.title}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <ID />
                單號
              </div>
              <div>{activeOrder?.id}</div>
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Fab />
                廠區
              </div>
              {activeOrder?.fab?.name ?? 'Empty'}
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Lab />
                實驗室
              </div>
              {activeOrder?.lab?.name ?? 'Empty'}
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Status />
                狀態
              </div>
              <StatusChip order={activeOrder} />
            </div>
            <div className="flex items-center">
              <div className="flex min-w-28 items-center gap-2">
                <Priority />
                優先序
              </div>
              <PriorityChip order={activeOrder} />
            </div>
          </div>
          <Divider />
          {activeOrder?.description}
        </ModalBody>
        <ModalFooter>
          <Button radius="sm" className="bg-black text-white">
            編輯
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
