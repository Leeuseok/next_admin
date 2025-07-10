import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input, Select } from '@/components/Form';
import type { InquiryFilter } from '@/types/inquiries';
import type { Admin } from '@/types/inquiries';

interface InquiryFiltersProps {
  filters: InquiryFilter;
  admins: Admin[];
  onFilterChange: (filters: Partial<InquiryFilter>) => void;
  resultsCount: number;
}

export default function InquiryFilters({ 
  filters, 
  admins, 
  onFilterChange, 
  resultsCount 
}: InquiryFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="search"
            placeholder="제목, 내용 검색..."
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>
        
        <Select
          name="status"
          value={filters.statusFilter}
          onChange={(e) => onFilterChange({ statusFilter: e.target.value })}
          options={[
            { value: '', label: '모든 상태' },
            { value: 'pending', label: '대기' },
            { value: 'in_progress', label: '진행중' },
            { value: 'resolved', label: '해결' },
            { value: 'closed', label: '종료' }
          ]}
        />
        
        <Select
          name="type"
          value={filters.typeFilter}
          onChange={(e) => onFilterChange({ typeFilter: e.target.value })}
          options={[
            { value: '', label: '모든 유형' },
            { value: 'general', label: '일반' },
            { value: 'bug', label: '버그' },
            { value: 'feature', label: '기능요청' },
            { value: 'complaint', label: '불만' }
          ]}
        />
        
        <Select
          name="assignee"
          value={filters.assigneeFilter}
          onChange={(e) => onFilterChange({ assigneeFilter: e.target.value })}
          options={[
            { value: '', label: '모든 담당자' },
            ...admins.map(admin => ({ value: admin.id, label: admin.name }))
          ]}
        />
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {resultsCount}개 결과
          </span>
        </div>
      </div>
    </div>
  );
}
