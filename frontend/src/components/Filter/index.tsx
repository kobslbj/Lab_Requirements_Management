'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { priority, status } from './data';

function Filter({
  onStatusChange,
  onPriorityChange,
}: {
  onStatusChange: (status: boolean | undefined) => void;
  onPriorityChange: (priority: number | undefined) => void;
}) {
  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <Select
        label="優先序"
        className="max-w-xs"
        variant="bordered"
        onChange={(e) => {
          if (e.target.value === '') {
            onPriorityChange(undefined);
            return;
          }

          onPriorityChange(Number(e.target.value));
        }}
      >
        {priority.map((p) => (
          <SelectItem key={p.key}>{p.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="狀態"
        className="max-w-xs"
        variant="bordered"
        onChange={(e) => {
          if (e.target.value === '') {
            onStatusChange(undefined);
            return;
          }

          onStatusChange(e.target.value === '1');
        }}
      >
        {status.map((s) => (
          <SelectItem key={s.key}>{s.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default Filter;
