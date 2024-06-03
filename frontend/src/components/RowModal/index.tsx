import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Order } from '@/types';
import { Divider, Select, SelectItem, Chip } from '@nextui-org/react';
import { Key, useState } from 'react';
import { Clip, Fab, ID, Lab, Priority, Status, Upload } from '../Icons';
import { Link } from '@nextui-org/react';
import StatusChip from './StatusChip';
import PriorityChip from './PriorityChip';
import Property from './Property';
import ActionButton from './ActionButton';

type Action = 'admin-view' | 'admin-edit' | 'worker-view';

export default function RowModal({
  activeOrder,
  isOpen,
  onOpenChange,
  action,
  setAction,
  onClose,
}: {
  activeOrder: Order;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  action: Action;
  setAction: (action: Action) => void;
  onClose: () => void;
}) {
  const [priority, setPriority] = useState(activeOrder.priority);

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
              {activeOrder._id}
            </Property>
            {action === 'worker-view' ? (
              <Property
                name={
                  <>
                    <Fab />
                    廠區
                  </>
                }
              >
                {activeOrder.fab_name}
              </Property>
            ) : (
              <Property
                name={
                  <>
                    <Lab />
                    實驗室
                  </>
                }
              >
                {activeOrder.lab_name}
              </Property>
            )}
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
              {action === 'admin-edit' ? (
                <Select
                  aria-label="優先序"
                  variant="faded"
                  size="sm"
                  radius="sm"
                  onChange={(e) => {
                    setPriority(Number(e.target.value));
                  }}
                  selectedKeys={[String(priority)]}
                >
                  <SelectItem variant="faded" color="danger" key="1" value={1}>
                    特急單
                  </SelectItem>
                  <SelectItem variant="faded" color="warning" key="2" value={2}>
                    急單
                  </SelectItem>
                  <SelectItem variant="faded" color="default" key="3" value={3}>
                    一般
                  </SelectItem>
                </Select>
              ) : (
                <PriorityChip order={activeOrder} />
              )}
            </Property>

            <Property
              name={
                <>
                  <Upload />
                  附件
                </>
              }
            >
              {activeOrder.attachments.length === 0 ? (
                <Chip startContent={<Clip />} variant="flat" radius="sm">
                  無附件
                </Chip>
              ) : (
                activeOrder.attachments.map((attachment: any, index: any) => (
                  <a
                    key={index}
                    href={`${process.env.NEXT_PUBLIC_API_URL}/orders/files/${attachment.file._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Chip startContent={<Clip />} variant="flat" radius="sm">
                      {attachment.file.filename}
                    </Chip>
                  </a>
                ))
              )}
            </Property>
          </div>
          <Divider />
          {activeOrder.description}
        </ModalBody>
        <ModalFooter>
          <ActionButton
            order={activeOrder}
            priority={priority}
            action={action}
            setAction={setAction}
            onClose={onClose}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
