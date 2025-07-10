import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input, Select } from '@/components/Form';
import type { NotificationFilter } from '@/types/notifications';

interface NotificationFiltersProps {
  filters: NotificationFilter;
  onFilterChange: (filters: Partial<NotificationFilter>) => void;
}

export default function NotificationFilters({ filters, onFilterChange }: NotificationFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
      <div className="relative">
        <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          name="search"
          placeholder="알림 검색..."
          value={filters.searchTerm}
          onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
          className="pl-10"
        />
      </div>
      
      <Select
        name="status"
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        options={[
          { value: 'all', label: '모든 상태' },
          { value: 'unread', label: '읽지 않음' },
          { value: 'read', label: '읽음' },
          { value: 'archived', label: '보관됨' }
        ]}
        className="w-full md:w-40"
      />
      
      <Select
        name="type"
        value={filters.type}
        onChange={(e) => onFilterChange({ type: e.target.value })}
        options={[
          { value: 'all', label: '모든 타입' },
          { value: 'info', label: '정보' },
          { value: 'success', label: '성공' },
          { value: 'warning', label: '경고' },
          { value: 'error', label: '오류' }
        ]}
        className="w-full md:w-40"
      />
    </div>
  );
}
