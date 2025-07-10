import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Input, Select } from '@/components/Form';

interface ContentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  resultCount: number;
}

export default function ContentFilters({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  resultCount
}: ContentFiltersProps) {
  const categories = [
    '공지사항',
    '뉴스',
    '제품',
    '회사 정보',
    '법적 문서',
    '블로그',
    '이벤트',
    '기타'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="search"
            placeholder="제목, 내용, 카테고리 검색..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select
          name="type"
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          options={[
            { value: '', label: '모든 타입' },
            { value: 'post', label: '게시글' },
            { value: 'page', label: '페이지' },
            { value: 'news', label: '뉴스' },
            { value: 'product', label: '제품' }
          ]}
        />
        
        <Select
          name="status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[
            { value: '', label: '모든 상태' },
            { value: 'published', label: '게시됨' },
            { value: 'draft', label: '초안' },
            { value: 'archived', label: '보관됨' }
          ]}
        />
        
        <Select
          name="category"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={[
            { value: '', label: '모든 카테고리' },
            ...categories.map(cat => ({ value: cat, label: cat }))
          ]}
        />
        
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {resultCount}개 결과
          </span>
        </div>
      </div>
    </div>
  );
}
