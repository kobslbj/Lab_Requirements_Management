'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { FilterProps } from '@/types';
import { priority, status } from './data';

const Filter: React.FC<FilterProps> = ({
  onStatusChange,
  onPriorityChange,
}) => {
  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <div className="filter-priority"></div>
      <Select
        label="優先序"
        className="max-w-xs"
        variant="bordered"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0] as string;
          const value = key === '' ? 0 : Number(key);
          onPriorityChange(value);
        }}
      >
        {priority.map((priority) => (
          <SelectItem key={priority.key}>{priority.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="狀態"
        className="max-w-xs"
        variant="bordered"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0] as string;
          const value = key === '' ? 0 : Number(key);
          onStatusChange(value);
        }}
      >
        {status.map((status) => (
          <SelectItem key={status.key}>{status.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Filter;
