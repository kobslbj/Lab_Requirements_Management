import { Button } from '@nextui-org/button';

type ActionButtonProps = {
  actionType: 'admin' | 'worker';
};

export default function ActionButton({ actionType }: ActionButtonProps) {
  return (
    <Button radius="sm" className="bg-black text-white">
      {actionType === 'admin' ? '編輯' : '完成'}
    </Button>
  );
}
