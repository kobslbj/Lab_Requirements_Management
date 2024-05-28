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
import Property from './Property';
import ActionButton from './ActionButton';

export default function RowModal({
  activeOrder,
  isOpen,
  onOpenChange,
  actionType,
}: {
  activeOrder: Order | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: 'admin' | 'worker';
}) {
  if (!activeOrder) return null;

  return (
    <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="text-xl">{activeOrder.title}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col text-sm">
            <Property
              name={
                <>
                  <ID />
                  單號
                </>
              }
            >
              {activeOrder.id}
            </Property>
            <Property
              name={
                <>
                  <Fab />
                  廠區
                </>
              }
            >
              {activeOrder.fab?.name ?? 'Empty'}
            </Property>
            <Property
              name={
                <>
                  <Lab />
                  實驗室
                </>
              }
            >
              {activeOrder.lab?.name ?? 'Empty'}
            </Property>
            <Property
              name={
                <>
                  <Status />
                  狀態
                </>
              }
            >
              <StatusChip order={activeOrder} />
            </Property>
            <Property
              name={
                <>
                  <Priority />
                  優先序
                </>
              }
            >
              <PriorityChip order={activeOrder} />
            </Property>
          </div>
          <Divider />
          {activeOrder.description}
        </ModalBody>
        <ModalFooter>
          <ModalFooter>
            <ActionButton actionType={actionType} />
          </ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
