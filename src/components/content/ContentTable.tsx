import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  PhotoIcon,
  NewspaperIcon,
  GlobeAltIcon,
  FilmIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import Table from '@/components/Table';
import { formatDate, cn } from '@/lib/utils';
import type { Content as ContentType } from '@/types/content';
import type { TableColumn } from '@/types';

interface ContentTableProps {
  contents: ContentType[];
  onView: (content: ContentType) => void;
  onEdit: (content: ContentType) => void;
  onDelete: (content: ContentType) => void;
  onReview?: (content: ContentType) => void;
}

export default function ContentTable({ contents, onView, onEdit, onDelete, onReview }: ContentTableProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <DocumentTextIcon className="h-4 w-4 text-blue-600" />;
      case 'product':
        return <PhotoIcon className="h-4 w-4 text-green-600" />;
      case 'news':
        return <NewspaperIcon className="h-4 w-4 text-purple-600" />;
      case 'page':
        return <GlobeAltIcon className="h-4 w-4 text-orange-600" />;
      case 'image':
        return <PhotoIcon className="h-4 w-4 text-pink-600" />;
      case 'video':
        return <FilmIcon className="h-4 w-4 text-red-600" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return '게시글';
      case 'product':
        return '상품';
      case 'news':
        return '뉴스';
      case 'page':
        return '페이지';
      case 'image':
        return '이미지';
      case 'video':
        return '비디오';
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return '임시저장';
      case 'pending':
        return '검토 대기';
      case 'approved':
        return '승인됨';
      case 'published':
        return '게시됨';
      case 'rejected':
        return '반려됨';
      case 'scheduled':
        return '예약됨';
      case 'archived':
        return '보관됨';
      default:
        return status;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: TableColumn[] = [
    {
      key: 'title',
      label: '제목',
      sortable: true,
      render: (value: string, row: ContentType) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            {getTypeIcon(row.type)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900 truncate">{value}</div>
            <div className="text-sm text-gray-500 truncate">
              {row.excerpt || '-'}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', getPriorityBadgeClass(row.priority))}>
                {row.priority === 'high' ? '높음' : row.priority === 'medium' ? '보통' : '낮음'}
              </span>
              {row.featured && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                  추천
                </span>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: '타입',
      sortable: true,
      render: (value: string) => (
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          value === 'post' ? 'bg-blue-100 text-blue-800' :
          value === 'product' ? 'bg-green-100 text-green-800' :
          value === 'news' ? 'bg-purple-100 text-purple-800' :
          value === 'page' ? 'bg-orange-100 text-orange-800' :
          value === 'image' ? 'bg-pink-100 text-pink-800' :
          value === 'video' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        )}>
          {getTypeLabel(value)}
        </span>
      )
    },
    {
      key: 'status',
      label: '상태',
      sortable: true,
      render: (value: string) => (
        <span className={cn('px-2 py-1 text-xs font-medium rounded-full', getStatusBadgeClass(value))}>
          {getStatusLabel(value)}
        </span>
      )
    },
    {
      key: 'author',
      label: '작성자',
      sortable: true,
      render: (value: string, row: ContentType) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          {row.reviewer && (
            <div className="text-xs text-gray-500">검토자: {row.reviewer}</div>
          )}
        </div>
      )
    },
    {
      key: 'category',
      label: '카테고리',
      sortable: true
    },
    {
      key: 'viewCount',
      label: '조회수',
      sortable: true,
      render: (value: number) => value.toLocaleString()
    },
    {
      key: 'createdAt',
      label: '작성일',
      sortable: true,
      render: (value: string, row: ContentType) => (
        <div>
          <div className="text-sm text-gray-900">{formatDate(value)}</div>
          {row.scheduledAt && (
            <div className="text-xs text-purple-600">
              예약: {formatDate(row.scheduledAt)}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: '액션',
      render: (_, row: ContentType) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onView(row)}
            className="text-blue-600 hover:text-blue-900 text-sm"
            title="보기"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(row)}
            className="text-yellow-600 hover:text-yellow-900 text-sm"
            title="편집"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          {onReview && (row.status === 'pending' || row.status === 'rejected') && (
            <button
              onClick={() => onReview(row)}
              className="text-green-600 hover:text-green-900 text-sm"
              title="검수"
            >
              <CheckIcon className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(row)}
            className="text-red-600 hover:text-red-900 text-sm"
            title="삭제"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <Table
      data={contents}
      columns={columns}
      onRowClick={(content) => onView(content)}
    />
  );
}
