import { Button } from '@nextui-org/button';
import { useTransition } from 'react';
import updateOrder from './action';

type Action = 'admin-view' | 'admin-edit' | 'worker-view';

export default function ActionButton({
  action,
  setAction,
}: {
  action: Action;
  setAction: (action: Action) => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      radius="sm"
      className="bg-black text-white"
      isLoading={isPending}
      onPress={() => {
        if (action === 'admin-view') {
          setAction('admin-edit');
          return;
        }

        if (action === 'admin-edit') {
          startTransition(async () => {
            await updateOrder();
            setAction('admin-view');
          });
        }
      }}
    >
      {action === 'worker-view'
        ? '完成'
        : action === 'admin-view'
          ? '編輯'
          : '更新'}
    </Button>
  );
}
