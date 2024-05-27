import { Button } from '@nextui-org/button';

type ActionButtonProps = {
  actionType: 'edit' | 'complete';
};

export default function ActionButton({ actionType }: ActionButtonProps) {
  return (
    <Button radius="sm" className="bg-black text-white">
      {actionType === 'edit' ? '編輯' : '完成'}
    </Button>
  );
}
