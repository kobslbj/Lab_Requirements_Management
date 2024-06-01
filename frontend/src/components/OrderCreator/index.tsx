'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/use-disclosure';
import {
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { useState, useTransition } from 'react';
import { Lab, Priority } from '../Icons';
import Property from '../RowModal/Property';
import createOrder from './action';

export default function OrderCreator() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lab, setLab] = useState('化學實驗室');
  const [priority, setPriority] = useState(3);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Button
        radius="sm"
        size="lg"
        variant="faded"
        className="text-sm"
        onPress={onOpen}
      >
        新增委託單
      </Button>
      <Modal
        size="lg"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="text-xl">
            <Input
              aria-label="委託單名稱"
              variant="faded"
              size="lg"
              radius="sm"
              placeholder="委託單名稱"
              value={title}
              onValueChange={setTitle}
            />
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2 text-sm">
              <Property
                name={
                  <>
                    <Lab />
                    實驗室
                  </>
                }
              >
                <Select
                  aria-label="實驗室"
                  variant="faded"
                  size="sm"
                  radius="sm"
                  selectedKeys={[lab]}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      return;
                    }

                    setLab(e.target.value);
                  }}
                >
                  <SelectItem key="化學實驗室">化學實驗室</SelectItem>
                  <SelectItem key="表面實驗室">表面實驗室</SelectItem>
                  <SelectItem key="成分分析實驗室">成分分析實驗室</SelectItem>
                </Select>
              </Property>
              <Property
                name={
                  <>
                    <Priority />
                    優先序
                  </>
                }
              >
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
              </Property>
            </div>
            <Divider />
            <Textarea
              aria-label="委託單內容"
              variant="faded"
              radius="sm"
              placeholder="委託單內容"
              value={description}
              onValueChange={setDescription}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              radius="sm"
              variant="faded"
              isDisabled={!title || !description}
              isLoading={isPending}
              onPress={() => {
                startTransition(async () => {
                  await createOrder(title, description, lab, priority);
                  onClose();
                  setTitle('');
                  setDescription('');
                  setLab('化學實驗室');
                  setPriority(3);
                });
              }}
            >
              新增
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
