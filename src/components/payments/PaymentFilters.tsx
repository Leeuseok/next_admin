import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input, Select } from '@/components/Form';

interface PaymentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  methodFilter: string;
  onMethodChange: (value: string) => void;
  resultCount: number;
}

export default function PaymentFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  methodFilter,
  onMethodChange,
  resultCount
}: PaymentFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="search"
            placeholder="사용자명 또는 거래ID 검색..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select
          name="status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[
            { value: '', label: '모든 상태' },
            { value: 'completed', label: '완료' },
            { value: 'pending', label: '대기' },
            { value: 'failed', label: '실패' },
            { value: 'refunded', label: '환불' }
          ]}
        />
        
        <Select
          name="method"
          value={methodFilter}
          onChange={(e) => onMethodChange(e.target.value)}
          options={[
            { value: '', label: '모든 결제방법' },
            { value: '신용카드', label: '신용카드' },
            { value: '계좌이체', label: '계좌이체' },
            { value: 'PayPal', label: 'PayPal' },
            { value: '카카오페이', label: '카카오페이' },
            { value: '네이버페이', label: '네이버페이' }
          ]}
        />
        
        <div className="flex items-center justify-end">
          <span className="text-sm text-gray-600">
            {resultCount}개 결과
          </span>
        </div>
      </div>
    </div>
  );
}
